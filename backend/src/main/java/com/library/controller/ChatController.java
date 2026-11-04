package com.library.controller;

import com.library.dto.request.ConversationRequest;
import com.library.dto.request.SendMessageRequest;
import com.library.dto.response.ApiResponse;
import com.library.dto.response.ConversationResponse;
import com.library.dto.response.MessageResponse;
import com.library.dto.response.PageResponse;
import com.library.entity.Conversation;
import com.library.entity.ConversationMember;
import com.library.entity.Message;
import com.library.entity.User;
import com.library.enums.ConversationType;
import com.library.enums.MemberRole;
import com.library.enums.MessageType;
import com.library.enums.RoleType;
import com.library.repository.ConversationMemberRepository;
import com.library.repository.ConversationRepository;
import com.library.repository.MessageRepository;
import com.library.repository.UserRepository;
import com.library.security.CustomUserDetails;
import com.library.service.ChatService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/conversations")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;
    private final UserRepository userRepository;
    private final ConversationRepository conversationRepository;
    private final ConversationMemberRepository memberRepository;
    private final MessageRepository messageRepository;

    @GetMapping
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<ApiResponse<List<ConversationResponse>>> getMyConversations(
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        return ResponseEntity.ok(ApiResponse.ok(
                "Lấy danh sách cuộc trò chuyện thành công",
                chatService.getMyConversations(currentUser.getId())
        ));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<ApiResponse<ConversationResponse>> createConversation(
            @Valid @RequestBody ConversationRequest request,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        ConversationResponse created = chatService.createConversation(currentUser.getId(), request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Khởi tạo cuộc trò chuyện thành công", created));
    }

    @GetMapping("/{conversationId}/messages")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<ApiResponse<PageResponse<MessageResponse>>> getMessages(
            @PathVariable Long conversationId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "30") int size,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(ApiResponse.ok(
                "Lấy danh sách tin nhắn thành công",
                chatService.getConversationMessages(conversationId, currentUser.getId(), pageable)
        ));
    }

    @PostMapping("/{conversationId}/messages")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<ApiResponse<MessageResponse>> sendMessage(
            @PathVariable Long conversationId,
            @Valid @RequestBody SendMessageRequest request,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        MessageResponse sent = chatService.sendMessage(conversationId, currentUser.getId(), request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Đã gửi tin nhắn", sent));
    }

    @PatchMapping("/messages/{messageId}/revoke")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<ApiResponse<MessageResponse>> revokeMessage(
            @PathVariable Long messageId,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        MessageResponse revoked = chatService.revokeMessage(messageId, currentUser.getId());
        return ResponseEntity.ok(ApiResponse.ok("Đã thu hồi tin nhắn", revoked));
    }

    // =========================================================================
    // ĐỒNG BỘ TIN NHẮN TRỰC TIẾP 1-1 THỜI GIAN THỰC GIỮA CÁC TÀI KHOẢN (MySQL TiDB)
    // =========================================================================

    @PostMapping("/send-direct-message")
    @Transactional
    public ResponseEntity<ApiResponse<Map<String, Object>>> sendDirectMessage(
            @RequestBody Map<String, String> payload
    ) {
        String fromUserRaw = payload.get("fromUser");
        String toUserRaw = payload.get("toUser");
        String text = payload.get("text");
        String time = payload.get("time");
        String cipherText = payload.get("cipherText");
        String senderName = payload.get("senderName");
        String clientMessageId = payload.get("clientMessageId");
        String attachmentUrl = payload.get("attachmentUrl");
        String attachmentName = payload.get("attachmentName");
        String attachmentType = payload.get("attachmentType");

        if (fromUserRaw == null || toUserRaw == null || (text == null && cipherText == null && attachmentUrl == null)) {
            return ResponseEntity.badRequest().body(ApiResponse.error(400, "Thiếu thông tin người gửi hoặc người nhận", null));
        }

        String cleanFrom = fromUserRaw.trim().replace("@", "").toLowerCase();
        String cleanTo = toUserRaw.trim().replace("@", "").toLowerCase();

        User sender = userRepository.findByUsername(cleanFrom).orElseGet(() -> {
            return userRepository.save(User.builder()
                    .username(cleanFrom)
                    .email(cleanFrom + "@mail.local")
                    .passwordHash("$2a$10$dummyHashForChatSyncOnly1234567890")
                    .displayName(senderName != null ? senderName : cleanFrom)
                    .role(RoleType.USER)
                    .build());
        });

        User recipient = userRepository.findByUsername(cleanTo).orElseGet(() -> {
            return userRepository.save(User.builder()
                    .username(cleanTo)
                    .email(cleanTo + "@mail.local")
                    .passwordHash("$2a$10$dummyHashForChatSyncOnly1234567890")
                    .displayName(cleanTo)
                    .role(cleanTo.contains("anhquyphi") ? RoleType.ADMIN : RoleType.USER)
                    .build());
        });

        Conversation conversation = conversationRepository.findDirectConversationBetween(sender.getId(), recipient.getId())
                .orElseGet(() -> {
                    Conversation conv = conversationRepository.save(Conversation.builder()
                            .type(ConversationType.DIRECT)
                            .createdBy(sender)
                            .build());

                    memberRepository.save(ConversationMember.builder()
                            .conversation(conv)
                            .user(sender)
                            .memberRole(MemberRole.LEADER)
                            .build());

                    memberRepository.save(ConversationMember.builder()
                            .conversation(conv)
                            .user(recipient)
                            .memberRole(MemberRole.MEMBER)
                            .build());

                    return conv;
                });

        Message msg = messageRepository.save(Message.builder()
                .conversation(conversation)
                .sender(sender)
                .messageType(MessageType.TEXT)
                .messageText(text != null ? text : cipherText)
                .isEncrypted(cipherText != null && !cipherText.isBlank())
                .cipherText(cipherText)
                .clientMessageId(clientMessageId)
                .attachmentUrl(attachmentUrl)
                .attachmentName(attachmentName)
                .attachmentType(attachmentType)
                .build());

        Map<String, Object> result = new HashMap<>();
        result.put("id", "msg-" + msg.getId());
        result.put("clientMessageId", clientMessageId);
        result.put("conversationId", conversation.getId());
        result.put("sender", "@" + sender.getUsername());
        result.put("senderName", sender.getDisplayName());
        result.put("text", msg.getMessageText());
        result.put("time", time != null ? time : "Vừa xong");
        result.put("cipherText", msg.getCipherText());
        result.put("attachmentUrl", msg.getAttachmentUrl());
        result.put("attachmentName", msg.getAttachmentName());
        result.put("attachmentType", msg.getAttachmentType());

        return ResponseEntity.ok(ApiResponse.ok("Đã gửi tin nhắn trực tiếp thành công", result));
    }

    @GetMapping("/direct-messages")
    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getDirectMessages(
            @RequestParam String user1,
            @RequestParam String user2
    ) {
        String clean1 = user1.trim().replace("@", "").toLowerCase();
        String clean2 = user2.trim().replace("@", "").toLowerCase();

        var u1Opt = userRepository.findByUsername(clean1);
        var u2Opt = userRepository.findByUsername(clean2);
        if (u1Opt.isEmpty() || u2Opt.isEmpty()) {
            return ResponseEntity.ok(ApiResponse.ok("Thành công", List.of()));
        }

        var convOpt = conversationRepository.findDirectConversationBetween(u1Opt.get().getId(), u2Opt.get().getId());
        if (convOpt.isEmpty()) {
            return ResponseEntity.ok(ApiResponse.ok("Thành công", List.of()));
        }

        List<Message> msgs = messageRepository.findByConversationIdOrderByCreatedAtDesc(convOpt.get().getId(), PageRequest.of(0, 100)).getContent();
        List<Map<String, Object>> list = new ArrayList<>();
        for (int i = msgs.size() - 1; i >= 0; i--) {
            Message m = msgs.get(i);
            Map<String, Object> item = new HashMap<>();
            item.put("id", "msg-" + m.getId());
            item.put("clientMessageId", m.getClientMessageId());
            item.put("sender", "@" + m.getSender().getUsername());
            item.put("senderName", m.getSender().getDisplayName());
            item.put("text", m.getMessageText());
            item.put("time", m.getCreatedAt() != null ? m.getCreatedAt().toString() : "Gần đây");
            item.put("cipherText", m.getCipherText());
            item.put("attachmentUrl", m.getAttachmentUrl());
            item.put("attachmentName", m.getAttachmentName());
            item.put("attachmentType", m.getAttachmentType());
            item.put("mine", false);
            list.add(item);
        }

        return ResponseEntity.ok(ApiResponse.ok("Lấy tin nhắn trực tiếp thành công", list));
    }

    @GetMapping("/user-conversations")
    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getUserConversations(
            @RequestParam String username
    ) {
        String cleanUser = username.trim().replace("@", "").toLowerCase();
        var userOpt = userRepository.findByUsername(cleanUser);
        if (userOpt.isEmpty()) {
            return ResponseEntity.ok(ApiResponse.ok("Thành công", List.of()));
        }

        List<Conversation> convs = conversationRepository.findUserConversations(userOpt.get().getId());
        List<Map<String, Object>> result = new ArrayList<>();
        for (Conversation c : convs) {
            Map<String, Object> m = new HashMap<>();
            m.put("id", "conv-" + c.getId());
            m.put("type", c.getType().name());

            User peer = c.getMembers().stream()
                    .map(ConversationMember::getUser)
                    .filter(u -> !u.getId().equals(userOpt.get().getId()))
                    .findFirst()
                    .orElse(userOpt.get());

            m.put("peerUsername", "@" + peer.getUsername());
            m.put("peerName", peer.getDisplayName() != null ? peer.getDisplayName() : peer.getUsername());
            m.put("peerAvatar", peer.getAvatarUrl());

            result.add(m);
        }

        return ResponseEntity.ok(ApiResponse.ok("Lấy danh sách cuộc trò chuyện thành công", result));
    }
}

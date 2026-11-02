package com.library.service.impl;

import com.library.dto.request.ConversationRequest;
import com.library.dto.request.SendMessageRequest;
import com.library.dto.response.ConversationResponse;
import com.library.dto.response.MessageResponse;
import com.library.dto.response.PageResponse;
import com.library.entity.*;
import com.library.enums.ConversationType;
import com.library.enums.MemberRole;
import com.library.enums.MessageStatus;
import com.library.enums.MessageType;
import com.library.exception.BadRequestException;
import com.library.exception.ResourceNotFoundException;
import com.library.repository.*;
import com.library.security.Aes256CryptoUtil;
import com.library.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

    private final ConversationRepository conversationRepository;
    private final ConversationMemberRepository memberRepository;
    private final MessageRepository messageRepository;
    private final UserRepository userRepository;
    private final ContentRepository contentRepository;
    private final Aes256CryptoUtil aes256CryptoUtil;

    @Override
    @Transactional(readOnly = true)
    public List<ConversationResponse> getMyConversations(Long userId) {
        return conversationRepository.findUserConversations(userId)
                .stream()
                .map(ConversationResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ConversationResponse createConversation(Long creatorUserId, ConversationRequest request) {
        User creator = userRepository.findById(creatorUserId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng #" + creatorUserId));

        if (request.getType() == ConversationType.DIRECT
                && request.getMemberUserIds() != null
                && !request.getMemberUserIds().isEmpty()) {
            Long peerId = request.getMemberUserIds().get(0);
            var existing = conversationRepository.findDirectConversationBetween(creatorUserId, peerId);
            if (existing.isPresent()) {
                return ConversationResponse.fromEntity(existing.get());
            }
        }

        Conversation conversation = Conversation.builder()
                .type(request.getType())
                .groupName(request.getGroupName())
                .groupAvatarUrl(request.getGroupAvatarUrl())
                .createdBy(creator)
                .build();
        Conversation saved = conversationRepository.save(conversation);

        ConversationMember ownerMember = ConversationMember.builder()
                .conversation(saved)
                .user(creator)
                .memberRole(MemberRole.OWNER)
                .build();
        saved.getMembers().add(memberRepository.save(ownerMember));

        if (request.getMemberUserIds() != null) {
            for (Long memberUserId : request.getMemberUserIds()) {
                if (!memberUserId.equals(creatorUserId)) {
                    userRepository.findById(memberUserId).ifPresent(u -> {
                        ConversationMember cm = ConversationMember.builder()
                                .conversation(saved)
                                .user(u)
                                .memberRole(MemberRole.MEMBER)
                                .build();
                        saved.getMembers().add(memberRepository.save(cm));
                    });
                }
            }
        }

        return ConversationResponse.fromEntity(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<MessageResponse> getConversationMessages(Long conversationId, Long userId, Pageable pageable) {
        if (!memberRepository.existsByConversationIdAndUserId(conversationId, userId)) {
            throw new BadRequestException("Bạn không phải là thành viên của cuộc trò chuyện này");
        }
        Page<Message> page = messageRepository.findByConversationIdOrderByCreatedAtDesc(conversationId, pageable);
        return PageResponse.fromPage(page.map(MessageResponse::fromEntity));
    }

    @Override
    @Transactional
    public MessageResponse sendMessage(Long conversationId, Long senderUserId, SendMessageRequest request) {
        Conversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy cuộc trò chuyện #" + conversationId));
        if (!memberRepository.existsByConversationIdAndUserId(conversationId, senderUserId)) {
            throw new BadRequestException("Bạn không phải là thành viên của cuộc trò chuyện này");
        }
        User sender = userRepository.findById(senderUserId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng #" + senderUserId));

        Content sharedContent = null;
        if (request.getSharedContentId() != null) {
            sharedContent = contentRepository.findById(request.getSharedContentId())
                    .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy tác phẩm chia sẻ #" + request.getSharedContentId()));
        }

        MessageType type = request.getMessageType() != null
                ? request.getMessageType()
                : (sharedContent != null ? MessageType.CONTENT_SHARE : MessageType.TEXT);

        String cipherText = request.getCipherText();
        String iv = request.getEncryptionIv();
        String sha256 = request.getSha256Hash();
        if ((cipherText == null || cipherText.isBlank()) && request.getMessageText() != null) {
            Aes256CryptoUtil.EncryptedPayload encrypted = aes256CryptoUtil.encrypt(request.getMessageText());
            cipherText = encrypted.cipherText();
            iv = encrypted.iv();
            sha256 = encrypted.sha256Hash();
        }

        Message message = Message.builder()
                .conversation(conversation)
                .sender(sender)
                .messageType(type)
                .messageText(request.getMessageText())
                .isEncrypted(request.getIsEncrypted() != null ? request.getIsEncrypted() : true)
                .encryptionAlgorithm(request.getEncryptionAlgorithm() != null ? request.getEncryptionAlgorithm() : "E2EE-AES-256-GCM")
                .cipherText(cipherText)
                .encryptionIv(iv)
                .keyFingerprint(request.getKeyFingerprint())
                .sha256Hash(sha256)
                .sharedContent(sharedContent)
                .status(MessageStatus.SENT)
                .isRevoked(false)
                .build();

        return MessageResponse.fromEntity(messageRepository.save(message));
    }

    @Override
    @Transactional
    public MessageResponse revokeMessage(Long messageId, Long actorUserId) {
        Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy tin nhắn #" + messageId));
        if (!message.getSender().getId().equals(actorUserId)) {
            throw new BadRequestException("Bạn chỉ có thể thu hồi tin nhắn do chính mình gửi");
        }
        message.setIsRevoked(true);
        return MessageResponse.fromEntity(messageRepository.save(message));
    }
}

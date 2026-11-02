package com.library.controller;

import com.library.dto.request.ConversationRequest;
import com.library.dto.request.SendMessageRequest;
import com.library.dto.response.ApiResponse;
import com.library.dto.response.ConversationResponse;
import com.library.dto.response.MessageResponse;
import com.library.dto.response.PageResponse;
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
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/conversations")
@PreAuthorize("hasAnyRole('USER', 'ADMIN')")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ConversationResponse>>> getMyConversations(
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        return ResponseEntity.ok(ApiResponse.ok(
                "Lấy danh sách cuộc trò chuyện thành công",
                chatService.getMyConversations(currentUser.getId())
        ));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ConversationResponse>> createConversation(
            @Valid @RequestBody ConversationRequest request,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        ConversationResponse created = chatService.createConversation(currentUser.getId(), request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Khởi tạo cuộc trò chuyện thành công", created));
    }

    @GetMapping("/{conversationId}/messages")
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
    public ResponseEntity<ApiResponse<MessageResponse>> revokeMessage(
            @PathVariable Long messageId,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        MessageResponse revoked = chatService.revokeMessage(messageId, currentUser.getId());
        return ResponseEntity.ok(ApiResponse.ok("Đã thu hồi tin nhắn", revoked));
    }
}

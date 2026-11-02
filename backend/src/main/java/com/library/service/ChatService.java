package com.library.service;

import com.library.dto.request.ConversationRequest;
import com.library.dto.request.SendMessageRequest;
import com.library.dto.response.ConversationResponse;
import com.library.dto.response.MessageResponse;
import com.library.dto.response.PageResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ChatService {
    List<ConversationResponse> getMyConversations(Long userId);
    ConversationResponse createConversation(Long creatorUserId, ConversationRequest request);
    PageResponse<MessageResponse> getConversationMessages(Long conversationId, Long userId, Pageable pageable);
    MessageResponse sendMessage(Long conversationId, Long senderUserId, SendMessageRequest request);
    MessageResponse revokeMessage(Long messageId, Long actorUserId);
}

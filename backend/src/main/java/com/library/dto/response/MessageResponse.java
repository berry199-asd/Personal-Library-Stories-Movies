package com.library.dto.response;

import com.library.entity.Message;
import com.library.enums.MessageStatus;
import com.library.enums.MessageType;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MessageResponse {

    private Long id;
    private Long conversationId;
    private Long senderId;
    private String senderUsername;
    private String senderDisplayName;
    private String senderAvatarUrl;
    private MessageType messageType;
    private String messageText;
    private ContentResponse sharedContent;
    private MessageStatus status;
    private Boolean isRevoked;
    private LocalDateTime createdAt;

    public static MessageResponse fromEntity(Message message) {
        return MessageResponse.builder()
                .id(message.getId())
                .conversationId(message.getConversation().getId())
                .senderId(message.getSender().getId())
                .senderUsername(message.getSender().getUsername())
                .senderDisplayName(message.getSender().getDisplayName())
                .senderAvatarUrl(message.getSender().getAvatarUrl())
                .messageType(message.getMessageType())
                .messageText(Boolean.TRUE.equals(message.getIsRevoked()) ? "Tin nhắn đã bị thu hồi" : message.getMessageText())
                .sharedContent(message.getSharedContent() != null && !Boolean.TRUE.equals(message.getIsRevoked())
                        ? ContentResponse.fromEntity(message.getSharedContent(), null, false)
                        : null)
                .status(message.getStatus())
                .isRevoked(message.getIsRevoked())
                .createdAt(message.getCreatedAt())
                .build();
    }
}

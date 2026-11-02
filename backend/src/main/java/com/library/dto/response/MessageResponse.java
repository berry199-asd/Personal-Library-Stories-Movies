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
    private Boolean isEncrypted;
    private String encryptionAlgorithm;
    private String cipherText;
    private String encryptionIv;
    private String keyFingerprint;
    private String sha256Hash;
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
                .isEncrypted(message.getIsEncrypted())
                .encryptionAlgorithm(message.getEncryptionAlgorithm())
                .cipherText(Boolean.TRUE.equals(message.getIsRevoked()) ? null : message.getCipherText())
                .encryptionIv(Boolean.TRUE.equals(message.getIsRevoked()) ? null : message.getEncryptionIv())
                .keyFingerprint(message.getKeyFingerprint())
                .sha256Hash(message.getSha256Hash())
                .sharedContent(message.getSharedContent() != null && !Boolean.TRUE.equals(message.getIsRevoked())
                        ? ContentResponse.fromEntity(message.getSharedContent(), null, false)
                        : null)
                .status(message.getStatus())
                .isRevoked(message.getIsRevoked())
                .createdAt(message.getCreatedAt())
                .build();
    }
}

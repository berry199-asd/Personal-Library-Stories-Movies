package com.library.dto.request;

import com.library.enums.MessageType;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SendMessageRequest {

    @Builder.Default
    private MessageType messageType = MessageType.TEXT;

    private String messageText;

    private Long sharedContentId;

    @Builder.Default
    private Boolean isEncrypted = true;

    @Builder.Default
    private String encryptionAlgorithm = "E2EE-AES-256-GCM";

    private String cipherText;

    private String encryptionIv;

    private String keyFingerprint;

    private String sha256Hash;
}

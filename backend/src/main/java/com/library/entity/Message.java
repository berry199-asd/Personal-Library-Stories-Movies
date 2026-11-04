package com.library.entity;

import com.library.enums.MessageStatus;
import com.library.enums.MessageType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "messages")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "conversation_id", nullable = false)
    private Conversation conversation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id", nullable = false)
    private User sender;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(name = "message_type", nullable = false, length = 20)
    private MessageType messageType = MessageType.TEXT;

    @Column(name = "message_text", columnDefinition = "TEXT")
    private String messageText;

    @Builder.Default
    @Column(name = "is_encrypted", nullable = false)
    private Boolean isEncrypted = true;

    @Builder.Default
    @Column(name = "encryption_algorithm", length = 40)
    private String encryptionAlgorithm = "E2EE-AES-256-GCM";

    @Column(name = "cipher_text", columnDefinition = "TEXT")
    private String cipherText;

    @Column(name = "encryption_iv", length = 64)
    private String encryptionIv;

    @Column(name = "key_fingerprint", length = 128)
    private String keyFingerprint;

    @Column(name = "sha256_hash", length = 128)
    private String sha256Hash;

    @Column(name = "attachment_url", columnDefinition = "LONGTEXT")
    private String attachmentUrl;

    @Column(name = "attachment_name", length = 255)
    private String attachmentName;

    @Column(name = "attachment_type", length = 50)
    private String attachmentType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shared_content_id")
    private Content sharedContent;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private MessageStatus status = MessageStatus.SENT;

    @Builder.Default
    @Column(name = "is_revoked", nullable = false)
    private Boolean isRevoked = false;

    @Builder.Default
    @OneToMany(mappedBy = "message", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MessageAttachment> attachments = new ArrayList<>();

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}

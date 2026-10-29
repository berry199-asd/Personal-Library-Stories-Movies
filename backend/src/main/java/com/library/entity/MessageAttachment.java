package com.library.entity;

import com.library.enums.AttachmentType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "message_attachments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MessageAttachment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "message_id", nullable = false)
    private Message message;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(name = "attachment_type", nullable = false, length = 20)
    private AttachmentType attachmentType = AttachmentType.CONTENT_CARD;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "content_id")
    private Content content;

    @Column(name = "external_url", length = 500)
    private String externalUrl;

    @Column(name = "preview_title", length = 255)
    private String previewTitle;

    @Column(name = "preview_poster_url", length = 255)
    private String previewPosterUrl;

    @Column(name = "preview_description", length = 500)
    private String previewDescription;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}

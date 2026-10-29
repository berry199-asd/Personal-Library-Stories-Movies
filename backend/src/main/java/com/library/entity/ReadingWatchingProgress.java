package com.library.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "reading_watching_progress",
        uniqueConstraints = @UniqueConstraint(name = "uk_progress_user_chapter", columnNames = {"user_id", "chapter_id"})
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReadingWatchingProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "content_id", nullable = false)
    private Content content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chapter_id", nullable = false)
    private Chapter chapter;

    @Builder.Default
    @Column(name = "is_completed", nullable = false)
    private Boolean isCompleted = true;

    @UpdateTimestamp
    @Column(name = "last_accessed_at")
    private LocalDateTime lastAccessedAt;
}

package com.library.entity;

import com.library.enums.LibraryVisibility;
import com.library.enums.ReadingStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(
        name = "user_libraries",
        uniqueConstraints = @UniqueConstraint(name = "uk_user_content", columnNames = {"user_id", "content_id"})
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserLibrary {

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
    @JoinColumn(name = "source_user_id")
    private User sourceUser;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(name = "reading_status", length = 20)
    private ReadingStatus readingStatus = ReadingStatus.PLAN_TO_READ;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private LibraryVisibility visibility = LibraryVisibility.PRIVATE;

    @Builder.Default
    @Column(name = "is_favorite", nullable = false)
    private Boolean isFavorite = false;

    @Column(name = "personal_rating")
    private Byte personalRating;

    @Column(name = "personal_notes", columnDefinition = "TEXT")
    private String personalNotes;

    @Builder.Default
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "library_categories",
            joinColumns = @JoinColumn(name = "user_library_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private Set<Category> categories = new HashSet<>();

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}

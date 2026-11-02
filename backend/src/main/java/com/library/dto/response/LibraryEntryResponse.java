package com.library.dto.response;

import com.library.entity.UserLibrary;
import com.library.enums.LibraryVisibility;
import com.library.enums.ReadingStatus;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LibraryEntryResponse {

    private Long id;
    private Long userId;
    private String username;
    private Long sourceUserId;
    private String sourceUsername;
    private ContentResponse content;
    private ReadingStatus readingStatus;
    private LibraryVisibility visibility;
    private Boolean isFavorite;
    private Byte personalRating;
    private String personalNotes;
    private List<CategoryResponse> categories;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static LibraryEntryResponse fromEntity(UserLibrary entry, Double averageRating) {
        return LibraryEntryResponse.builder()
                .id(entry.getId())
                .userId(entry.getUser().getId())
                .username(entry.getUser().getUsername())
                .sourceUserId(entry.getSourceUser() != null ? entry.getSourceUser().getId() : null)
                .sourceUsername(entry.getSourceUser() != null ? entry.getSourceUser().getUsername() : null)
                .content(ContentResponse.fromEntity(entry.getContent(), averageRating, false))
                .readingStatus(entry.getReadingStatus())
                .visibility(entry.getVisibility())
                .isFavorite(entry.getIsFavorite())
                .personalRating(entry.getPersonalRating())
                .personalNotes(entry.getPersonalNotes())
                .categories(entry.getCategories() != null
                        ? entry.getCategories().stream().map(CategoryResponse::fromEntity).collect(Collectors.toList())
                        : List.of())
                .createdAt(entry.getCreatedAt())
                .updatedAt(entry.getUpdatedAt())
                .build();
    }
}

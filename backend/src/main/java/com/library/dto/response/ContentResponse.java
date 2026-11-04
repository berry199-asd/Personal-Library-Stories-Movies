package com.library.dto.response;

import com.library.entity.Content;
import com.library.enums.ContentStatus;
import com.library.enums.ContentType;
import com.library.enums.ContentVisibility;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContentResponse {

    private Long id;
    private String title;
    private ContentType contentType;
    private Boolean isSeries;
    private String posterUrl;
    private String authorOrDirector;
    private String description;
    private ContentStatus status;
    private String externalMainLink;
    private ContentVisibility visibility;
    private List<String> sharedWithUsers;
    private Long createdById;
    private String createdByUsername;
    private Double averageRating;
    private List<GenreResponse> genres;
    private List<ChapterResponse> chapters;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static ContentResponse fromEntity(Content content, Double averageRating, boolean includeChapters) {
        List<String> sharedList = (content.getSharedUsers() != null && !content.getSharedUsers().isBlank())
                ? java.util.Arrays.stream(content.getSharedUsers().split(","))
                        .map(String::trim)
                        .filter(s -> !s.isEmpty())
                        .collect(Collectors.toList())
                : List.of();

        return ContentResponse.builder()
                .id(content.getId())
                .title(content.getTitle())
                .contentType(content.getContentType())
                .isSeries(content.getIsSeries())
                .posterUrl(content.getPosterUrl())
                .authorOrDirector(content.getAuthorOrDirector())
                .description(content.getDescription())
                .status(content.getStatus())
                .externalMainLink(content.getExternalMainLink())
                .visibility(content.getVisibility())
                .sharedWithUsers(sharedList)
                .createdById(content.getCreatedBy() != null ? content.getCreatedBy().getId() : null)
                .createdByUsername(content.getCreatedBy() != null ? content.getCreatedBy().getUsername() : null)
                .averageRating(averageRating != null ? Math.round(averageRating * 10.0) / 10.0 : 0.0)
                .genres(content.getGenres() != null
                        ? content.getGenres().stream().map(GenreResponse::fromEntity).collect(Collectors.toList())
                        : List.of())
                .chapters(includeChapters && content.getChapters() != null
                        ? content.getChapters().stream().map(ChapterResponse::fromEntity).collect(Collectors.toList())
                        : null)
                .createdAt(content.getCreatedAt())
                .updatedAt(content.getUpdatedAt())
                .build();
    }
}

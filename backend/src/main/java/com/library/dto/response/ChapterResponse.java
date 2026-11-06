package com.library.dto.response;

import com.library.entity.Chapter;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChapterResponse {

    private Long id;
    private Long contentId;
    private Long seasonId;
    private Integer seasonNumber;
    private String seasonTitle;
    private BigDecimal chapterNumber;
    private Integer displayOrder;
    private String title;
    private String externalLink;
    private String notes;
    private LocalDateTime createdAt;

    public static ChapterResponse fromEntity(Chapter chapter) {
        return ChapterResponse.builder()
                .id(chapter.getId())
                .contentId(chapter.getContent() != null ? chapter.getContent().getId() : null)
                .seasonId(chapter.getSeason() != null ? chapter.getSeason().getId() : null)
                .seasonNumber(chapter.getSeason() != null ? chapter.getSeason().getSeasonNumber() : null)
                .seasonTitle(chapter.getSeason() != null ? chapter.getSeason().getTitle() : null)
                .chapterNumber(chapter.getChapterNumber())
                .displayOrder(chapter.getDisplayOrder())
                .title(chapter.getTitle())
                .externalLink(chapter.getExternalLink())
                .notes(chapter.getNotes())
                .createdAt(chapter.getCreatedAt())
                .build();
    }
}

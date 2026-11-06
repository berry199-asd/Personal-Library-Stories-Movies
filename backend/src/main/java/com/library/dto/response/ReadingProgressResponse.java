package com.library.dto.response;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReadingProgressResponse {

    private Long contentId;

    private List<Long> completedChapterIds;

    private List<Double> completedChapterNumbers;

    private int completedCount;

    private int totalChapters;

    private Long lastReadChapterId;

    private Double lastReadChapterNumber;

    private String lastReadChapterTitle;

    private LocalDateTime lastAccessedAt;
}

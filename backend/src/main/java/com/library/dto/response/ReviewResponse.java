package com.library.dto.response;

import com.library.entity.Review;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewResponse {

    private Long id;
    private Long contentId;
    private Long chapterId;
    private Long parentId;
    private Long userId;
    private String username;
    private String displayName;
    private String avatarUrl;
    private Byte rating;
    private String commentText;
    private Boolean isSpoiler;
    private Integer helpfulCount;
    private List<ReviewResponse> replies;
    private LocalDateTime createdAt;

    public static ReviewResponse fromEntity(Review review) {
        return ReviewResponse.builder()
                .id(review.getId())
                .contentId(review.getContent().getId())
                .chapterId(review.getChapter() != null ? review.getChapter().getId() : null)
                .parentId(review.getParent() != null ? review.getParent().getId() : null)
                .userId(review.getUser().getId())
                .username(review.getUser().getUsername())
                .displayName(review.getUser().getDisplayName())
                .avatarUrl(review.getUser().getAvatarUrl())
                .rating(review.getRating())
                .commentText(review.getCommentText())
                .isSpoiler(review.getIsSpoiler())
                .helpfulCount(review.getHelpfulCount())
                .replies(review.getReplies() != null
                        ? review.getReplies().stream().map(ReviewResponse::fromEntity).collect(Collectors.toList())
                        : List.of())
                .createdAt(review.getCreatedAt())
                .build();
    }
}

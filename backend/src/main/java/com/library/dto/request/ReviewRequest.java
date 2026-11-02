package com.library.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewRequest {

    private Long chapterId;

    private Long parentId;

    @Min(value = 1, message = "Điểm đánh giá tối thiểu là 1 sao")
    @Max(value = 5, message = "Điểm đánh giá tối đa là 5 sao")
    private Byte rating;

    @NotBlank(message = "Nội dung bình luận không được để trống")
    private String commentText;

    @Builder.Default
    private Boolean isSpoiler = false;
}

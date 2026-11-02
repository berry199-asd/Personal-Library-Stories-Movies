package com.library.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChapterRequest {

    private Long seasonId;

    @NotNull(message = "Số chương/tập không được để trống")
    private BigDecimal chapterNumber;

    private Integer displayOrder;

    private String title;

    @NotBlank(message = "Đường dẫn đọc/xem không được để trống")
    private String externalLink;

    private String notes;
}

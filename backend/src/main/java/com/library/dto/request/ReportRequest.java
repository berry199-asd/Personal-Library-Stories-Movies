package com.library.dto.request;

import com.library.enums.ReportTargetType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReportRequest {

    @NotNull(message = "Loại đối tượng báo cáo không được để trống")
    private ReportTargetType targetType;

    @NotNull(message = "ID đối tượng báo cáo không được để trống")
    private Long targetId;

    @NotBlank(message = "Lý do báo cáo không được để trống")
    private String reason;

    private String details;
}

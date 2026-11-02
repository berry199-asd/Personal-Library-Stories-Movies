package com.library.dto.response;

import com.library.entity.Report;
import com.library.enums.ReportStatus;
import com.library.enums.ReportTargetType;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReportResponse {

    private Long id;
    private Long reporterId;
    private String reporterUsername;
    private ReportTargetType targetType;
    private Long targetId;
    private String reason;
    private String details;
    private ReportStatus status;
    private String resolvedByUsername;
    private String adminNote;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static ReportResponse fromEntity(Report report) {
        return ReportResponse.builder()
                .id(report.getId())
                .reporterId(report.getReporter().getId())
                .reporterUsername(report.getReporter().getUsername())
                .targetType(report.getTargetType())
                .targetId(report.getTargetId())
                .reason(report.getReason())
                .details(report.getDetails())
                .status(report.getStatus())
                .resolvedByUsername(report.getResolvedBy() != null ? report.getResolvedBy().getUsername() : null)
                .adminNote(report.getAdminNote())
                .createdAt(report.getCreatedAt())
                .updatedAt(report.getUpdatedAt())
                .build();
    }
}

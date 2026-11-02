package com.library.service;

import com.library.dto.request.ReportRequest;
import com.library.dto.response.PageResponse;
import com.library.dto.response.ReportResponse;
import com.library.enums.ReportStatus;
import org.springframework.data.domain.Pageable;

public interface ReportService {
    ReportResponse submitReport(Long reporterUserId, ReportRequest request);
    PageResponse<ReportResponse> getReportsForAdmin(ReportStatus status, Pageable pageable);
    ReportResponse resolveReportByAdmin(Long reportId, Long adminUserId, ReportStatus status, String adminNote);
}

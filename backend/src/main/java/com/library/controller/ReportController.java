package com.library.controller;

import com.library.dto.request.ReportRequest;
import com.library.dto.response.ApiResponse;
import com.library.dto.response.PageResponse;
import com.library.dto.response.ReportResponse;
import com.library.enums.ReportStatus;
import com.library.security.CustomUserDetails;
import com.library.service.ReportService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @PostMapping("/api/reports")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<ApiResponse<ReportResponse>> submitReport(
            @Valid @RequestBody ReportRequest request,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        ReportResponse created = reportService.submitReport(currentUser.getId(), request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Đã gửi báo cáo vi phạm cho Quản trị viên xử lý", created));
    }

    @GetMapping("/api/admin/reports")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<PageResponse<ReportResponse>>> listReportsForAdmin(
            @RequestParam(required = false) ReportStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        return ResponseEntity.ok(ApiResponse.ok(
                "Quản trị viên: Lấy danh sách báo cáo vi phạm thành công",
                reportService.getReportsForAdmin(status, pageable)
        ));
    }

    @PatchMapping("/api/admin/reports/{reportId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<ReportResponse>> resolveReportByAdmin(
            @PathVariable Long reportId,
            @RequestParam ReportStatus status,
            @RequestParam(required = false) String adminNote,
            @AuthenticationPrincipal CustomUserDetails adminUser
    ) {
        ReportResponse resolved = reportService.resolveReportByAdmin(reportId, adminUser.getId(), status, adminNote);
        return ResponseEntity.ok(ApiResponse.ok("Quản trị viên: Đã cập nhật trạng thái xử lý báo cáo", resolved));
    }
}

package com.library.service.impl;

import com.library.dto.request.ReportRequest;
import com.library.dto.response.PageResponse;
import com.library.dto.response.ReportResponse;
import com.library.entity.Report;
import com.library.entity.User;
import com.library.enums.ReportStatus;
import com.library.exception.ResourceNotFoundException;
import com.library.repository.ReportRepository;
import com.library.repository.UserRepository;
import com.library.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final ReportRepository reportRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public ReportResponse submitReport(Long reporterUserId, ReportRequest request) {
        User reporter = userRepository.findById(reporterUserId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng #" + reporterUserId));
        Report report = Report.builder()
                .reporter(reporter)
                .targetType(request.getTargetType())
                .targetId(request.getTargetId())
                .reason(request.getReason().trim())
                .details(request.getDetails())
                .status(ReportStatus.PENDING)
                .build();
        return ReportResponse.fromEntity(reportRepository.save(report));
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<ReportResponse> getReportsForAdmin(ReportStatus status, Pageable pageable) {
        Page<Report> page = (status != null)
                ? reportRepository.findByStatusOrderByCreatedAtDesc(status, pageable)
                : reportRepository.findAll(pageable);
        return PageResponse.fromPage(page.map(ReportResponse::fromEntity));
    }

    @Override
    @Transactional
    public ReportResponse resolveReportByAdmin(Long reportId, Long adminUserId, ReportStatus status, String adminNote) {
        Report report = reportRepository.findById(reportId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy báo cáo vi phạm #" + reportId));
        User admin = userRepository.findById(adminUserId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy quản trị viên #" + adminUserId));

        report.setStatus(status);
        report.setResolvedBy(admin);
        if (adminNote != null) {
            report.setAdminNote(adminNote);
        }
        return ReportResponse.fromEntity(reportRepository.save(report));
    }
}

package com.library.controller;

import com.library.dto.response.ApiResponse;
import com.library.dto.response.NotificationResponse;
import com.library.dto.response.PageResponse;
import com.library.security.CustomUserDetails;
import com.library.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
@PreAuthorize("hasAnyRole('USER', 'ADMIN')")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<NotificationResponse>>> getMyNotifications(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(ApiResponse.ok(
                "Lấy danh sách thông báo thành công",
                notificationService.getMyNotifications(currentUser.getId(), pageable)
        ));
    }

    @GetMapping("/unread-count")
    public ResponseEntity<ApiResponse<Map<String, Long>>> countUnread(
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        long count = notificationService.countUnread(currentUser.getId());
        return ResponseEntity.ok(ApiResponse.ok("Lấy số lượng thông báo chưa đọc thành công", Map.of("unreadCount", count)));
    }

    @PatchMapping("/{notificationId}/read")
    public ResponseEntity<ApiResponse<NotificationResponse>> markAsRead(
            @PathVariable Long notificationId,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        return ResponseEntity.ok(ApiResponse.ok(
                "Đã đánh dấu thông báo là đã đọc",
                notificationService.markAsRead(notificationId, currentUser.getId())
        ));
    }

    @PatchMapping("/read-all")
    public ResponseEntity<ApiResponse<Void>> markAllAsRead(
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        notificationService.markAllAsRead(currentUser.getId());
        return ResponseEntity.ok(ApiResponse.ok("Đã đánh dấu tất cả thông báo là đã đọc", null));
    }
}

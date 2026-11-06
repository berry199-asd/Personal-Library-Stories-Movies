package com.library.controller;

import com.library.dto.response.ApiResponse;
import com.library.dto.response.NotificationResponse;
import com.library.dto.response.PageResponse;
import com.library.entity.Notification;
import com.library.entity.User;
import com.library.enums.NotificationType;
import com.library.exception.AccessDeniedCustomException;
import com.library.exception.ResourceNotFoundException;
import com.library.repository.NotificationRepository;
import com.library.repository.UserRepository;
import com.library.security.CustomUserDetails;
import com.library.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;
    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    private Long resolveUserId(CustomUserDetails currentUser, String username) {
        if (currentUser != null) {
            return currentUser.getId();
        }
        if (username != null && !username.isBlank()) {
            String clean = username.trim().replace("@", "").toLowerCase();
            return userRepository.findByUsername(clean).map(User::getId)
                    .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng @" + username));
        }
        throw new AccessDeniedCustomException("Vui lòng đăng nhập để xem thông báo");
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<NotificationResponse>>> getMyNotifications(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "30") int size,
            @RequestParam(required = false) String username,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        Long userId = resolveUserId(currentUser, username);
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(ApiResponse.ok(
                "Lấy danh sách thông báo thành công",
                notificationService.getMyNotifications(userId, pageable)
        ));
    }

    @GetMapping("/unread-count")
    public ResponseEntity<ApiResponse<Map<String, Long>>> countUnread(
            @RequestParam(required = false) String username,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        Long userId = resolveUserId(currentUser, username);
        long count = notificationService.countUnread(userId);
        return ResponseEntity.ok(ApiResponse.ok("Lấy số lượng thông báo chưa đọc thành công", Map.of("unreadCount", count)));
    }

    @RequestMapping(value = "/{notificationId}/read", method = {RequestMethod.PATCH, RequestMethod.PUT, RequestMethod.POST})
    public ResponseEntity<ApiResponse<NotificationResponse>> markAsRead(
            @PathVariable Long notificationId,
            @RequestParam(required = false) String username,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        Long userId = resolveUserId(currentUser, username);
        return ResponseEntity.ok(ApiResponse.ok(
                "Đã đánh dấu thông báo là đã đọc",
                notificationService.markAsRead(notificationId, userId)
        ));
    }

    @RequestMapping(value = "/read-all", method = {RequestMethod.PATCH, RequestMethod.PUT, RequestMethod.POST})
    public ResponseEntity<ApiResponse<Void>> markAllAsRead(
            @RequestParam(required = false) String username,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        Long userId = resolveUserId(currentUser, username);
        notificationService.markAllAsRead(userId);
        return ResponseEntity.ok(ApiResponse.ok("Đã đánh dấu tất cả thông báo là đã đọc", null));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<NotificationResponse>> createNotification(
            @RequestBody Map<String, Object> payload
    ) {
        String targetUsername = (String) payload.get("targetUsername");
        if (targetUsername == null) {
            targetUsername = (String) payload.get("recipientUsername");
        }
        String actorUsername = (String) payload.get("actorUsername");
        if (actorUsername == null) {
            actorUsername = (String) payload.get("senderUsername");
        }
        String title = (String) payload.get("title");
        String message = (String) payload.get("message");
        String typeStr = (String) payload.get("type");
        Object refIdObj = payload.get("referenceId");

        if (targetUsername == null || title == null || message == null) {
            return ResponseEntity.badRequest().body(ApiResponse.error(400, "Thiếu thông tin người nhận hoặc nội dung", null));
        }

        String cleanTarget = targetUsername.trim().replace("@", "").toLowerCase();
        User targetUser = userRepository.findByUsername(cleanTarget).orElse(null);
        if (targetUser == null) {
            return ResponseEntity.ok(ApiResponse.ok("Bỏ qua do người nhận không tồn tại trên hệ thống", null));
        }

        User actor = null;
        if (actorUsername != null && !actorUsername.isBlank()) {
            String cleanActor = actorUsername.trim().replace("@", "").toLowerCase();
            actor = userRepository.findByUsername(cleanActor).orElse(null);
        }

        Long refId = null;
        if (refIdObj instanceof Number) {
            refId = ((Number) refIdObj).longValue();
        } else if (refIdObj instanceof String) {
            try { refId = Long.parseLong((String) refIdObj); } catch (Exception ignored) {}
        }

        NotificationType type = NotificationType.NEW_MESSAGE;
        if (typeStr != null) {
            try { type = NotificationType.valueOf(typeStr.toUpperCase()); } catch (Exception ignored) {}
        }

        Notification notif = notificationRepository.save(Notification.builder()
                .user(targetUser)
                .actor(actor)
                .type(type)
                .title(title)
                .message(message)
                .referenceId(refId)
                .isRead(false)
                .build());

        log.info("Created notification #{} for user @{}: {}", notif.getId(), cleanTarget, title);
        return ResponseEntity.ok(ApiResponse.ok("Đã tạo thông báo thành công", NotificationResponse.fromEntity(notif)));
    }
}

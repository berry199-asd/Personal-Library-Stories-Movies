package com.library.service;

import com.library.dto.response.NotificationResponse;
import com.library.dto.response.PageResponse;
import org.springframework.data.domain.Pageable;

public interface NotificationService {
    PageResponse<NotificationResponse> getMyNotifications(Long userId, Pageable pageable);
    long countUnread(Long userId);
    NotificationResponse markAsRead(Long notificationId, Long userId);
    void markAllAsRead(Long userId);
}

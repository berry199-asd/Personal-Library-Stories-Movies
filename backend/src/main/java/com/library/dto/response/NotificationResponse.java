package com.library.dto.response;

import com.library.entity.Notification;
import com.library.entity.User;
import com.library.enums.NotificationType;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationResponse {

    private Long id;
    private NotificationType type;
    private String actorUsername;
    private String actorDisplayName;
    private String actorAvatar;
    private String title;
    private String message;
    private Long referenceId;
    private Boolean isRead;
    private LocalDateTime createdAt;

    public static NotificationResponse fromEntity(Notification notification) {
        User actor = notification.getActor();
        String actorName = actor != null ? (actor.getDisplayName() != null ? actor.getDisplayName() : actor.getUsername()) : null;
        String actorAvatar = actor != null ? actor.getAvatarUrl() : null;

        return NotificationResponse.builder()
                .id(notification.getId())
                .type(notification.getType())
                .actorUsername(actor != null ? actor.getUsername() : null)
                .actorDisplayName(actorName)
                .actorAvatar(actorAvatar)
                .title(notification.getTitle())
                .message(notification.getMessage())
                .referenceId(notification.getReferenceId())
                .isRead(notification.getIsRead())
                .createdAt(notification.getCreatedAt())
                .build();
    }
}

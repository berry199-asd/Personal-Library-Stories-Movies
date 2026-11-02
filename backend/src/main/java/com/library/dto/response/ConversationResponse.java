package com.library.dto.response;

import com.library.entity.Conversation;
import com.library.enums.ConversationType;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConversationResponse {

    private Long id;
    private ConversationType type;
    private String groupName;
    private String groupAvatarUrl;
    private Long createdById;
    private List<String> memberUsernames;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static ConversationResponse fromEntity(Conversation conversation) {
        return ConversationResponse.builder()
                .id(conversation.getId())
                .type(conversation.getType())
                .groupName(conversation.getGroupName())
                .groupAvatarUrl(conversation.getGroupAvatarUrl())
                .createdById(conversation.getCreatedBy() != null ? conversation.getCreatedBy().getId() : null)
                .memberUsernames(conversation.getMembers() != null
                        ? conversation.getMembers().stream().map(m -> m.getUser().getUsername()).collect(Collectors.toList())
                        : List.of())
                .createdAt(conversation.getCreatedAt())
                .updatedAt(conversation.getUpdatedAt())
                .build();
    }
}

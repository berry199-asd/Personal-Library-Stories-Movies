package com.library.dto.request;

import com.library.enums.ConversationType;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConversationRequest {

    @NotNull(message = "Loại hội thoại (DIRECT / GROUP) không được để trống")
    private ConversationType type;

    private String groupName;

    private String groupAvatarUrl;

    private List<Long> memberUserIds;
}

package com.library.dto.request;

import com.library.enums.MessageType;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SendMessageRequest {

    @Builder.Default
    private MessageType messageType = MessageType.TEXT;

    private String messageText;

    private Long sharedContentId;
}

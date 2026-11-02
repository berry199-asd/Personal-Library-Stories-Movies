package com.library.dto.request;

import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateProfileRequest {

    @Size(max = 100, message = "Tên hiển thị không được vượt quá 100 ký tự")
    private String displayName;

    @Size(max = 255, message = "Đường dẫn ảnh đại diện không được vượt quá 255 ký tự")
    private String avatarUrl;

    @Size(max = 1000, message = "Giới thiệu bản thân không được vượt quá 1000 ký tự")
    private String bio;
}

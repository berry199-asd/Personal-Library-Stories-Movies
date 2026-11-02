package com.library.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginRequest {

    @NotBlank(message = "Vui lòng nhập tên đăng nhập hoặc email")
    private String usernameOrEmail;

    @NotBlank(message = "Vui lòng nhập mật khẩu")
    private String password;
}

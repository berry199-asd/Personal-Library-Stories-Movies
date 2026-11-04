package com.library.controller;

import com.library.dto.request.LoginRequest;
import com.library.dto.request.RegisterRequest;
import com.library.dto.request.SendOtpRequest;
import com.library.dto.request.VerifyOtpRequest;
import com.library.dto.response.ApiResponse;
import com.library.dto.response.AuthResponse;
import com.library.security.OtpVerificationService;
import com.library.service.AuthService;
import com.library.exception.BadRequestException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/send-otp")
    public ResponseEntity<ApiResponse<OtpVerificationService.OtpDispatchResult>> sendOtp(@Valid @RequestBody SendOtpRequest request) {
        OtpVerificationService.OtpDispatchResult result = authService.sendOtp(request);
        return ResponseEntity.ok(ApiResponse.ok("Đã gửi mã xác thực OTP 6 chữ số đến email của bạn", result));
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<ApiResponse<Map<String, Object>>> verifyOtp(@Valid @RequestBody VerifyOtpRequest request) {
        boolean verified = authService.verifyOtp(request);
        return ResponseEntity.ok(ApiResponse.ok("Xác thực mã OTP thành công", Map.of("verified", verified, "email", request.getEmail())));
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.created("Đăng ký tài khoản thành công", response));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(ApiResponse.ok("Đăng nhập thành công", response));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Object>> logout() {
        return ResponseEntity.ok(ApiResponse.ok("Đăng xuất thành công", null));
    }
}

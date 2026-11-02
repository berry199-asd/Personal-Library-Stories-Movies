package com.library.service;

import com.library.dto.request.LoginRequest;
import com.library.dto.request.RegisterRequest;
import com.library.dto.request.SendOtpRequest;
import com.library.dto.request.VerifyOtpRequest;
import com.library.dto.response.AuthResponse;
import com.library.security.OtpVerificationService;

public interface AuthService {
    OtpVerificationService.OtpDispatchResult sendOtp(SendOtpRequest request);
    boolean verifyOtp(VerifyOtpRequest request);
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
}

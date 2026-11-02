package com.library.service.impl;

import com.library.dto.request.LoginRequest;
import com.library.dto.request.RegisterRequest;
import com.library.dto.request.SendOtpRequest;
import com.library.dto.request.VerifyOtpRequest;
import com.library.dto.response.AuthResponse;
import com.library.dto.response.UserResponse;
import com.library.entity.User;
import com.library.enums.RoleType;
import com.library.enums.UserStatus;
import com.library.exception.BadRequestException;
import com.library.repository.UserRepository;
import com.library.security.Aes256CryptoUtil;
import com.library.security.JwtTokenProvider;
import com.library.security.OtpVerificationService;
import com.library.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final OtpVerificationService otpVerificationService;
    private final Aes256CryptoUtil aes256CryptoUtil;

    @Override
    public OtpVerificationService.OtpDispatchResult sendOtp(SendOtpRequest request) {
        if ("REGISTER".equalsIgnoreCase(request.getPurpose()) && userRepository.existsByEmail(request.getEmail().trim().toLowerCase())) {
            throw new BadRequestException("Email này đã được đăng ký tài khoản.");
        }
        return otpVerificationService.generateAndSendOtp(request.getEmail(), request.getPurpose());
    }

    @Override
    public boolean verifyOtp(VerifyOtpRequest request) {
        return otpVerificationService.verifyOtp(request.getEmail(), request.getPurpose(), request.getOtpCode());
    }

    @Override
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername().trim())) {
            throw new BadRequestException("Tên đăng nhập đã được sử dụng");
        }
        if (userRepository.existsByEmail(request.getEmail().trim())) {
            throw new BadRequestException("Email đã được sử dụng");
        }

        boolean verifiedByOtp = false;
        if (request.getOtpCode() != null && !request.getOtpCode().isBlank()) {
            verifiedByOtp = otpVerificationService.verifyOtp(request.getEmail(), "REGISTER", request.getOtpCode());
        }

        String displayName = (request.getDisplayName() != null && !request.getDisplayName().isBlank())
                ? request.getDisplayName().trim()
                : request.getUsername().trim();

        String e2eeFingerprint = (request.getE2eeKeyFingerprint() != null && !request.getE2eeKeyFingerprint().isBlank())
                ? request.getE2eeKeyFingerprint().trim()
                : aes256CryptoUtil.sha256Hex(request.getUsername().trim() + ":" + request.getEmail().trim()).substring(0, 32).toUpperCase();

        User newUser = User.builder()
                .username(request.getUsername().trim())
                .email(request.getEmail().trim().toLowerCase())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .displayName(displayName)
                .role(RoleType.USER)
                .status(UserStatus.ACTIVE)
                .emailVerified(verifiedByOtp)
                .e2eePublicKey(request.getE2eePublicKey())
                .e2eeKeyFingerprint(e2eeFingerprint)
                .build();

        User savedUser = userRepository.save(newUser);
        String jwt = tokenProvider.generateTokenFromUserId(
                savedUser.getId(),
                savedUser.getUsername(),
                savedUser.getRole().name()
        );

        return AuthResponse.builder()
                .accessToken(jwt)
                .user(UserResponse.fromEntity(savedUser))
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsernameOrEmail().trim(),
                        request.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);

        User user = userRepository.findByUsername(request.getUsernameOrEmail().trim())
                .or(() -> userRepository.findByEmail(request.getUsernameOrEmail().trim()))
                .orElseThrow(() -> new BadRequestException("Không tìm thấy thông tin tài khoản"));

        return AuthResponse.builder()
                .accessToken(jwt)
                .user(UserResponse.fromEntity(user))
                .build();
    }
}

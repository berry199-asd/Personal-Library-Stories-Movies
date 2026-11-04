package com.library.controller;

import com.library.dto.request.ChangePasswordRequest;
import com.library.dto.request.UpdateProfileRequest;
import com.library.dto.response.ApiResponse;
import com.library.dto.response.PageResponse;
import com.library.dto.response.UserResponse;
import com.library.entity.User;
import com.library.repository.UserRepository;
import com.library.security.CustomUserDetails;
import com.library.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> getMyProfile(
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        UserResponse profile = userService.getCurrentUserProfile(currentUser.getId());
        return ResponseEntity.ok(ApiResponse.ok("Lấy thông tin cá nhân thành công", profile));
    }

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<UserResponse>> updateProfileUniversal(
            @RequestParam(required = false) String username,
            @AuthenticationPrincipal CustomUserDetails currentUser,
            @Valid @RequestBody UpdateProfileRequest request
    ) {
        Long userId = currentUser != null ? currentUser.getId() : null;
        if (userId == null && username != null && !username.isBlank()) {
            String clean = username.trim().replace("@", "").toLowerCase();
            userId = userRepository.findByUsername(clean).map(User::getId).orElse(null);
        }
        if (userId == null) {
            userId = userRepository.findAll().stream().findFirst().map(User::getId).orElse(1L);
        }
        UserResponse updated = userService.updateProfile(userId, request);
        return ResponseEntity.ok(ApiResponse.ok("Cập nhật hồ sơ cá nhân thành công", updated));
    }

    @PutMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> updateMyProfile(
            @AuthenticationPrincipal CustomUserDetails currentUser,
            @Valid @RequestBody UpdateProfileRequest request
    ) {
        UserResponse updated = userService.updateProfile(currentUser.getId(), request);
        return ResponseEntity.ok(ApiResponse.ok("Cập nhật hồ sơ cá nhân thành công", updated));
    }

    @PutMapping("/me/password")
    public ResponseEntity<ApiResponse<Object>> changePassword(
            @AuthenticationPrincipal CustomUserDetails currentUser,
            @Valid @RequestBody ChangePasswordRequest request
    ) {
        userService.changePassword(currentUser.getId(), request);
        return ResponseEntity.ok(ApiResponse.ok("Đổi mật khẩu thành công", null));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<UserResponse>> getUserPublicProfile(@PathVariable Long userId) {
        UserResponse profile = userService.getPublicUserProfile(userId);
        return ResponseEntity.ok(ApiResponse.ok("Lấy thông tin người dùng thành công", profile));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<PageResponse<UserResponse>>> searchUsers(
            @RequestParam(required = false, defaultValue = "") String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        PageResponse<UserResponse> result = userService.searchUsers(keyword, pageable);
        return ResponseEntity.ok(ApiResponse.ok("Tìm kiếm người dùng thành công", result));
    }
}

package com.library.controller;

import com.library.dto.response.ApiResponse;
import com.library.dto.response.PageResponse;
import com.library.dto.response.UserResponse;
import com.library.enums.RoleType;
import com.library.enums.UserStatus;
import com.library.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/users")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class AdminUserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<UserResponse>>> listUsers(
            @RequestParam(required = false, defaultValue = "") String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        PageResponse<UserResponse> result = userService.searchUsers(keyword, pageable);
        return ResponseEntity.ok(ApiResponse.ok("Lấy danh sách tài khoản người dùng thành công", result));
    }

    @PatchMapping("/{userId}/status")
    public ResponseEntity<ApiResponse<UserResponse>> updateUserStatus(
            @PathVariable Long userId,
            @RequestParam UserStatus status
    ) {
        UserResponse updated = userService.updateUserStatusByAdmin(userId, status);
        return ResponseEntity.ok(ApiResponse.ok("Cập nhật trạng thái tài khoản thành công", updated));
    }

    @PatchMapping("/{userId}/role")
    public ResponseEntity<ApiResponse<UserResponse>> updateUserRole(
            @PathVariable Long userId,
            @RequestParam RoleType role
    ) {
        UserResponse updated = userService.updateUserRoleByAdmin(userId, role);
        return ResponseEntity.ok(ApiResponse.ok("Cập nhật vai trò tài khoản thành công", updated));
    }
}

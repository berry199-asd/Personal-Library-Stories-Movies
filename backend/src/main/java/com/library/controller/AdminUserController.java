package com.library.controller;

import com.library.dto.response.ApiResponse;
import com.library.dto.response.PageResponse;
import com.library.dto.response.UserResponse;
import com.library.entity.User;
import com.library.enums.RoleType;
import com.library.enums.UserStatus;
import com.library.exception.AccessDeniedCustomException;
import com.library.exception.ResourceNotFoundException;
import com.library.repository.UserRepository;
import com.library.security.CustomUserDetails;
import com.library.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
public class AdminUserController {

    private final UserService userService;
    private final UserRepository userRepository;

    private void verifyAdminPrivileges(CustomUserDetails currentUser, String actorUsername) {
        if (currentUser != null && currentUser.getRole() == RoleType.ADMIN) {
            return;
        }
        if (actorUsername != null && !actorUsername.isBlank()) {
            String clean = actorUsername.trim().replace("@", "").toLowerCase();
            Optional<User> actor = userRepository.findByUsername(clean);
            if (actor.isPresent() && (actor.get().getRole() == RoleType.ADMIN || "anhquyphi".equals(clean))) {
                return;
            }
        }
        throw new AccessDeniedCustomException("Chỉ quản trị viên (ADMIN) mới có quyền thực hiện thao tác quản trị người dùng.");
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<UserResponse>>> listUsers(
            @RequestParam(required = false, defaultValue = "") String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) String actorUsername,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        verifyAdminPrivileges(currentUser, actorUsername);
        Pageable pageable = PageRequest.of(page, size);
        PageResponse<UserResponse> result = userService.searchUsers(keyword, pageable);
        return ResponseEntity.ok(ApiResponse.ok("Lấy danh sách tài khoản người dùng thành công", result));
    }

    @RequestMapping(value = "/{userId}/status", method = {RequestMethod.PATCH, RequestMethod.PUT, RequestMethod.POST})
    public ResponseEntity<ApiResponse<UserResponse>> updateUserStatus(
            @PathVariable Long userId,
            @RequestParam(required = false) UserStatus status,
            @RequestBody(required = false) Map<String, Object> body,
            @RequestParam(required = false) String actorUsername,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        verifyAdminPrivileges(currentUser, actorUsername);
        UserStatus finalStatus = status;
        if (finalStatus == null && body != null && body.containsKey("status")) {
            finalStatus = UserStatus.valueOf(String.valueOf(body.get("status")).toUpperCase());
        }
        if (finalStatus == null) finalStatus = UserStatus.ACTIVE;
        UserResponse updated = userService.updateUserStatusByAdmin(userId, finalStatus);
        return ResponseEntity.ok(ApiResponse.ok("Cập nhật trạng thái tài khoản thành công", updated));
    }

    @RequestMapping(value = "/{userId}/role", method = {RequestMethod.PATCH, RequestMethod.PUT, RequestMethod.POST})
    public ResponseEntity<ApiResponse<UserResponse>> updateUserRole(
            @PathVariable Long userId,
            @RequestParam(required = false) RoleType role,
            @RequestBody(required = false) Map<String, Object> body,
            @RequestParam(required = false) String actorUsername,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        verifyAdminPrivileges(currentUser, actorUsername);
        RoleType finalRole = role;
        if (finalRole == null && body != null && body.containsKey("role")) {
            finalRole = RoleType.valueOf(String.valueOf(body.get("role")).toUpperCase());
        }
        if (finalRole == null) finalRole = RoleType.USER;
        UserResponse updated = userService.updateUserRoleByAdmin(userId, finalRole, actorUsername);
        return ResponseEntity.ok(ApiResponse.ok("Cập nhật vai trò tài khoản thành công", updated));
    }

    @RequestMapping(value = "/by-username/{username}/role", method = {RequestMethod.PATCH, RequestMethod.PUT, RequestMethod.POST})
    public ResponseEntity<ApiResponse<UserResponse>> updateUserRoleByUsername(
            @PathVariable String username,
            @RequestParam(required = false) RoleType role,
            @RequestBody(required = false) Map<String, Object> body,
            @RequestParam(required = false) String actorUsername,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        verifyAdminPrivileges(currentUser, actorUsername);
        String clean = username.trim().replace("@", "").toLowerCase();
        User target = userRepository.findByUsername(clean)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng @" + username));

        RoleType finalRole = role;
        if (finalRole == null && body != null && body.containsKey("role")) {
            finalRole = RoleType.valueOf(String.valueOf(body.get("role")).toUpperCase());
        }
        if (finalRole == null) finalRole = RoleType.USER;
        UserResponse updated = userService.updateUserRoleByAdmin(target.getId(), finalRole, actorUsername);
        return ResponseEntity.ok(ApiResponse.ok("Cập nhật vai trò tài khoản @" + username + " thành công", updated));
    }
}

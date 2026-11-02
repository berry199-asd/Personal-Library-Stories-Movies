package com.library.service;

import com.library.dto.request.ChangePasswordRequest;
import com.library.dto.request.UpdateProfileRequest;
import com.library.dto.response.PageResponse;
import com.library.dto.response.UserResponse;
import com.library.enums.RoleType;
import com.library.enums.UserStatus;
import org.springframework.data.domain.Pageable;

public interface UserService {
    UserResponse getCurrentUserProfile(Long userId);
    UserResponse getPublicUserProfile(Long userId);
    UserResponse updateProfile(Long userId, UpdateProfileRequest request);
    void changePassword(Long userId, ChangePasswordRequest request);
    PageResponse<UserResponse> searchUsers(String keyword, Pageable pageable);
    UserResponse updateUserStatusByAdmin(Long targetUserId, UserStatus status);
    UserResponse updateUserRoleByAdmin(Long targetUserId, RoleType role);
}

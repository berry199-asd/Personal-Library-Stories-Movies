package com.library.controller;

import com.library.dto.request.CategoryRequest;
import com.library.dto.response.ApiResponse;
import com.library.dto.response.CategoryResponse;
import com.library.enums.RoleType;
import com.library.security.CustomUserDetails;
import com.library.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping("/api/categories")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<ApiResponse<List<CategoryResponse>>> getMyCategories(
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        return ResponseEntity.ok(ApiResponse.ok(
                "Lấy danh sách danh mục thành công",
                categoryService.getAvailableCategories(currentUser.getId())
        ));
    }

    @PostMapping("/api/categories")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<ApiResponse<CategoryResponse>> createCustomCategory(
            @Valid @RequestBody CategoryRequest request,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        CategoryResponse created = categoryService.createCustomCategory(currentUser.getId(), request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Tạo danh mục cá nhân mới thành công", created));
    }

    @PostMapping("/api/admin/categories")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<CategoryResponse>> createSystemCategory(
            @Valid @RequestBody CategoryRequest request
    ) {
        CategoryResponse created = categoryService.createSystemCategory(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Quản trị viên: Tạo danh mục mặc định hệ thống thành công", created));
    }

    @PutMapping("/api/categories/{id}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<ApiResponse<CategoryResponse>> updateCategory(
            @PathVariable Long id,
            @Valid @RequestBody CategoryRequest request,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        boolean isAdmin = currentUser.getRole() == RoleType.ADMIN;
        CategoryResponse updated = categoryService.updateCategory(id, currentUser.getId(), isAdmin, request);
        return ResponseEntity.ok(ApiResponse.ok("Cập nhật danh mục thành công", updated));
    }

    @DeleteMapping("/api/categories/{id}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteCategory(
            @PathVariable Long id,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        boolean isAdmin = currentUser.getRole() == RoleType.ADMIN;
        categoryService.deleteCategory(id, currentUser.getId(), isAdmin);
        return ResponseEntity.ok(ApiResponse.ok("Xóa danh mục thành công", null));
    }
}

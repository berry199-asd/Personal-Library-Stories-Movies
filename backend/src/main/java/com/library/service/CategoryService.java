package com.library.service;

import com.library.dto.request.CategoryRequest;
import com.library.dto.response.CategoryResponse;

import java.util.List;

public interface CategoryService {
    List<CategoryResponse> getAvailableCategories(Long userId);
    CategoryResponse createCustomCategory(Long userId, CategoryRequest request);
    CategoryResponse createSystemCategory(CategoryRequest request);
    CategoryResponse updateCategory(Long categoryId, Long actorUserId, boolean isAdmin, CategoryRequest request);
    void deleteCategory(Long categoryId, Long actorUserId, boolean isAdmin);
}

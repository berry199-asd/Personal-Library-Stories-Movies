package com.library.service.impl;

import com.library.dto.request.CategoryRequest;
import com.library.dto.response.CategoryResponse;
import com.library.entity.Category;
import com.library.entity.User;
import com.library.exception.BadRequestException;
import com.library.exception.ResourceNotFoundException;
import com.library.repository.CategoryRepository;
import com.library.repository.UserRepository;
import com.library.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public List<CategoryResponse> getAvailableCategories(Long userId) {
        return categoryRepository.findAllAvailableForUser(userId)
                .stream()
                .map(CategoryResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public CategoryResponse createCustomCategory(Long userId, CategoryRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng #" + userId));
        Category category = Category.builder()
                .user(user)
                .name(request.getName().trim())
                .description(request.getDescription())
                .isSystemDefault(false)
                .build();
        return CategoryResponse.fromEntity(categoryRepository.save(category));
    }

    @Override
    @Transactional
    public CategoryResponse createSystemCategory(CategoryRequest request) {
        Category category = Category.builder()
                .user(null)
                .name(request.getName().trim())
                .description(request.getDescription())
                .isSystemDefault(true)
                .build();
        return CategoryResponse.fromEntity(categoryRepository.save(category));
    }

    @Override
    @Transactional
    public CategoryResponse updateCategory(Long categoryId, Long actorUserId, boolean isAdmin, CategoryRequest request) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy danh mục #" + categoryId));
        if (!isAdmin) {
            if (Boolean.TRUE.equals(category.getIsSystemDefault())
                    || category.getUser() == null
                    || !category.getUser().getId().equals(actorUserId)) {
                throw new BadRequestException("Bạn chỉ có thể chỉnh sửa danh mục cá nhân do chính mình tạo");
            }
        }
        category.setName(request.getName().trim());
        category.setDescription(request.getDescription());
        return CategoryResponse.fromEntity(categoryRepository.save(category));
    }

    @Override
    @Transactional
    public void deleteCategory(Long categoryId, Long actorUserId, boolean isAdmin) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy danh mục #" + categoryId));
        if (!isAdmin) {
            if (Boolean.TRUE.equals(category.getIsSystemDefault())
                    || category.getUser() == null
                    || !category.getUser().getId().equals(actorUserId)) {
                throw new BadRequestException("Bạn không có quyền xóa danh mục này");
            }
        }
        categoryRepository.delete(category);
    }
}

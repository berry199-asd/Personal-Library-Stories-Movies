package com.library.dto.response;

import com.library.entity.Category;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryResponse {

    private Long id;
    private Long userId;
    private String name;
    private String description;
    private Boolean isSystemDefault;

    public static CategoryResponse fromEntity(Category category) {
        return CategoryResponse.builder()
                .id(category.getId())
                .userId(category.getUser() != null ? category.getUser().getId() : null)
                .name(category.getName())
                .description(category.getDescription())
                .isSystemDefault(category.getIsSystemDefault())
                .build();
    }
}

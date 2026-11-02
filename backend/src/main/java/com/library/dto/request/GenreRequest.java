package com.library.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GenreRequest {

    @NotBlank(message = "Tên thể loại không được để trống")
    @Size(max = 100, message = "Tên thể loại tối đa 100 ký tự")
    private String name;

    @Size(max = 120, message = "Slug tối đa 120 ký tự")
    private String slug;

    @Size(max = 255, message = "Mô tả tối đa 255 ký tự")
    private String description;
}

package com.library.dto.response;

import com.library.entity.Genre;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GenreResponse {

    private Long id;
    private String name;
    private String slug;
    private String description;

    public static GenreResponse fromEntity(Genre genre) {
        return GenreResponse.builder()
                .id(genre.getId())
                .name(genre.getName())
                .slug(genre.getSlug())
                .description(genre.getDescription())
                .build();
    }
}

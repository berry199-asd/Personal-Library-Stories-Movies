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
    private String applicableType;
    private int contentCount;

    public static GenreResponse fromEntity(Genre genre) {
        String rawDesc = genre.getDescription();
        String type = "BOTH";
        String cleanDesc = rawDesc;
        if (rawDesc != null && rawDesc.startsWith("[Type:")) {
            int end = rawDesc.indexOf("]");
            if (end > 6) {
                type = rawDesc.substring(6, end).trim().toUpperCase();
                cleanDesc = rawDesc.substring(end + 1).trim();
            }
        }

        return GenreResponse.builder()
                .id(genre.getId())
                .name(genre.getName())
                .slug(genre.getSlug())
                .description(cleanDesc)
                .applicableType(type)
                .contentCount(0)
                .build();
    }
}

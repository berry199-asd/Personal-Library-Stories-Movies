package com.library.dto.request;

import com.library.enums.LibraryVisibility;
import com.library.enums.ReadingStatus;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LibraryEntryRequest {

    @NotNull(message = "ID nội dung không được để trống")
    private Long contentId;

    private ReadingStatus readingStatus;

    private LibraryVisibility visibility;

    private Boolean isFavorite;

    @Min(value = 1, message = "Điểm cá nhân từ 1 đến 5 sao")
    @Max(value = 5, message = "Điểm cá nhân từ 1 đến 5 sao")
    private Byte personalRating;

    private String personalNotes;

    private Set<Long> categoryIds;
}

package com.library.dto.request;

import com.library.enums.ContentStatus;
import com.library.enums.ContentType;
import com.library.enums.ContentVisibility;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContentRequest {

    @NotBlank(message = "Tiêu đề tác phẩm không được để trống")
    private String title;

    @NotNull(message = "Loại nội dung (MANGA / MOVIE) không được để trống")
    private ContentType contentType;

    @Builder.Default
    private Boolean isSeries = true;

    private String posterUrl;

    private String authorOrDirector;

    private String description;

    @Builder.Default
    private ContentStatus status = ContentStatus.ONGOING;

    private String externalMainLink;

    @Builder.Default
    private ContentVisibility visibility = ContentVisibility.PUBLIC;

    private List<String> sharedWithUsers;

    private Set<Long> genreIds;

    private List<String> seasonTitles;

    private List<ChapterRequest> chapters;
}

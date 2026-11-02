package com.library.service;

import com.library.dto.request.ChapterRequest;
import com.library.dto.request.ContentRequest;
import com.library.dto.response.ChapterResponse;
import com.library.dto.response.ContentResponse;
import com.library.dto.response.PageResponse;
import com.library.enums.ContentStatus;
import com.library.enums.ContentType;
import org.springframework.data.domain.Pageable;

public interface ContentService {
    PageResponse<ContentResponse> searchContents(
            String keyword,
            ContentType contentType,
            ContentStatus status,
            Long genreId,
            Long currentUserId,
            Pageable pageable
    );

    PageResponse<ContentResponse> getAllContentsForAdmin(Pageable pageable);

    ContentResponse getContentDetail(Long id, Long currentUserId, boolean isAdmin);

    ContentResponse createContent(ContentRequest request, Long creatorUserId);

    ContentResponse updateContent(Long id, ContentRequest request, Long actorUserId, boolean isAdmin);

    void deleteContent(Long id);

    ChapterResponse addChapter(Long contentId, ChapterRequest request);

    ChapterResponse updateChapter(Long chapterId, ChapterRequest request);

    void deleteChapter(Long chapterId);
}

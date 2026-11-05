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
            String currentUsername,
            Pageable pageable
    );

    default PageResponse<ContentResponse> searchContents(
            String keyword,
            ContentType contentType,
            ContentStatus status,
            Long genreId,
            Long currentUserId,
            Pageable pageable
    ) {
        return searchContents(keyword, contentType, status, genreId, currentUserId, null, pageable);
    }

    PageResponse<ContentResponse> getAllContentsForAdmin(Pageable pageable);

    PageResponse<ContentResponse> getMyPublishedContents(Long userId, Pageable pageable);

    ContentResponse getContentDetail(Long id, Long currentUserId, String currentUsername, boolean isAdmin);

    ContentResponse getContentByTitle(String title, Long actorUserId, String actorUsername, boolean isAdmin);

    default ContentResponse getContentDetail(Long id, Long currentUserId, boolean isAdmin) {
        return getContentDetail(id, currentUserId, null, isAdmin);
    }

    ContentResponse createContent(ContentRequest request, Long creatorUserId);

    ContentResponse updateContent(Long id, ContentRequest request, Long actorUserId, boolean isAdmin);

    void deleteContent(Long id, Long actorUserId, boolean isAdmin);

    ChapterResponse addChapter(Long contentId, ChapterRequest request, Long actorUserId, boolean isAdmin);

    ChapterResponse updateChapter(Long chapterId, ChapterRequest request, Long actorUserId, boolean isAdmin);

    void deleteChapter(Long chapterId, Long actorUserId, boolean isAdmin);
}

package com.library.service;

import com.library.dto.request.LibraryEntryRequest;
import com.library.dto.response.ContentResponse;
import com.library.dto.response.LibraryEntryResponse;
import com.library.dto.response.PageResponse;
import com.library.enums.ContentType;
import com.library.enums.ReadingStatus;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface LibraryService {
    PageResponse<LibraryEntryResponse> getMyLibrary(
            Long userId,
            String keyword,
            ContentType contentType,
            ReadingStatus readingStatus,
            Long genreId,
            Long categoryId,
            Boolean favoriteOnly,
            Pageable pageable
    );

    PageResponse<LibraryEntryResponse> getPublicSharedLibraryByUsername(String username, Pageable pageable);

    LibraryEntryResponse upsertLibraryEntry(Long userId, LibraryEntryRequest request);

    LibraryEntryResponse copyFromSharedEntry(Long targetUserId, Long sourceLibraryEntryId);

    void removeFromLibrary(Long userId, Long contentId);

    List<Long> getCompletedChapterIds(Long userId, Long contentId);

    boolean toggleChapterProgress(Long userId, Long chapterId);

    boolean toggleFavorite(Long userId, Long contentId);

    List<Long> getFavoriteContentIds(Long userId);

    List<ContentResponse> getFavoriteContents(Long userId);
}

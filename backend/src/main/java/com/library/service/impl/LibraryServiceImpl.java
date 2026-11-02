package com.library.service.impl;

import com.library.dto.request.LibraryEntryRequest;
import com.library.dto.response.LibraryEntryResponse;
import com.library.dto.response.PageResponse;
import com.library.entity.*;
import com.library.enums.ContentType;
import com.library.enums.LibraryVisibility;
import com.library.enums.ReadingStatus;
import com.library.exception.BadRequestException;
import com.library.exception.ResourceNotFoundException;
import com.library.repository.*;
import com.library.service.LibraryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LibraryServiceImpl implements LibraryService {

    private final UserLibraryRepository userLibraryRepository;
    private final UserRepository userRepository;
    private final ContentRepository contentRepository;
    private final CategoryRepository categoryRepository;
    private final FavoriteRepository favoriteRepository;
    private final ChapterRepository chapterRepository;
    private final ReadingWatchingProgressRepository progressRepository;
    private final ReviewRepository reviewRepository;

    @Override
    @Transactional(readOnly = true)
    public PageResponse<LibraryEntryResponse> getMyLibrary(
            Long userId,
            String keyword,
            ContentType contentType,
            ReadingStatus readingStatus,
            Long genreId,
            Long categoryId,
            Boolean favoriteOnly,
            Pageable pageable
    ) {
        String normalizedKeyword = (keyword != null && !keyword.isBlank()) ? keyword.trim() : null;
        Page<UserLibrary> page = userLibraryRepository.filterUserLibrary(
                userId,
                normalizedKeyword,
                contentType,
                readingStatus,
                genreId,
                categoryId,
                favoriteOnly,
                pageable
        );
        Page<LibraryEntryResponse> mapped = page.map(ul -> LibraryEntryResponse.fromEntity(
                ul,
                reviewRepository.calculateAverageRating(ul.getContent().getId())
        ));
        return PageResponse.fromPage(mapped);
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<LibraryEntryResponse> getPublicSharedLibraryByUsername(String username, Pageable pageable) {
        String cleanUsername = username.startsWith("@") ? username.substring(1) : username;
        User owner = userRepository.findByUsername(cleanUsername)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng @" + cleanUsername));
        Page<UserLibrary> page = userLibraryRepository.findByUserIdAndVisibility(
                owner.getId(),
                LibraryVisibility.SHARED,
                pageable
        );
        Page<LibraryEntryResponse> mapped = page.map(ul -> LibraryEntryResponse.fromEntity(
                ul,
                reviewRepository.calculateAverageRating(ul.getContent().getId())
        ));
        return PageResponse.fromPage(mapped);
    }

    @Override
    @Transactional
    public LibraryEntryResponse upsertLibraryEntry(Long userId, LibraryEntryRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng #" + userId));
        Content content = contentRepository.findById(request.getContentId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy truyện/phim #" + request.getContentId()));

        UserLibrary entry = userLibraryRepository.findByUserIdAndContentId(userId, content.getId())
                .orElseGet(() -> UserLibrary.builder()
                        .user(user)
                        .content(content)
                        .readingStatus(ReadingStatus.PLAN_TO_READ)
                        .visibility(LibraryVisibility.PRIVATE)
                        .isFavorite(false)
                        .build());

        if (request.getReadingStatus() != null) {
            entry.setReadingStatus(request.getReadingStatus());
        }
        if (request.getVisibility() != null) {
            entry.setVisibility(request.getVisibility());
        }
        if (request.getIsFavorite() != null) {
            entry.setIsFavorite(request.getIsFavorite());
            syncFavoriteTable(user, content, request.getIsFavorite());
        }
        if (request.getPersonalRating() != null) {
            entry.setPersonalRating(request.getPersonalRating());
        }
        if (request.getPersonalNotes() != null) {
            entry.setPersonalNotes(request.getPersonalNotes());
        }
        if (request.getCategoryIds() != null) {
            Set<Category> categories = new HashSet<>(categoryRepository.findAllById(request.getCategoryIds()));
            entry.setCategories(categories);
        }

        UserLibrary saved = userLibraryRepository.save(entry);
        Double avgRating = reviewRepository.calculateAverageRating(content.getId());
        return LibraryEntryResponse.fromEntity(saved, avgRating);
    }

    @Override
    @Transactional
    public LibraryEntryResponse copyFromSharedEntry(Long targetUserId, Long sourceLibraryEntryId) {
        UserLibrary source = userLibraryRepository.findById(sourceLibraryEntryId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy mục thư viện được chia sẻ #" + sourceLibraryEntryId));

        if (source.getVisibility() != LibraryVisibility.SHARED && !source.getUser().getId().equals(targetUserId)) {
            throw new BadRequestException("Mục thư viện này đang ở chế độ Riêng tư, không thể sao chép");
        }

        User targetUser = userRepository.findById(targetUserId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng #" + targetUserId));

        UserLibrary copy = userLibraryRepository.findByUserIdAndContentId(targetUserId, source.getContent().getId())
                .orElseGet(() -> UserLibrary.builder()
                        .user(targetUser)
                        .content(source.getContent())
                        .sourceUser(source.getUser())
                        .readingStatus(ReadingStatus.PLAN_TO_READ)
                        .visibility(LibraryVisibility.PRIVATE)
                        .isFavorite(false)
                        .build());

        copy.setSourceUser(source.getUser());
        UserLibrary saved = userLibraryRepository.save(copy);
        Double avgRating = reviewRepository.calculateAverageRating(source.getContent().getId());
        return LibraryEntryResponse.fromEntity(saved, avgRating);
    }

    @Override
    @Transactional
    public void removeFromLibrary(Long userId, Long contentId) {
        UserLibrary entry = userLibraryRepository.findByUserIdAndContentId(userId, contentId)
                .orElseThrow(() -> new ResourceNotFoundException("Tác phẩm không có trong thư viện cá nhân của bạn"));
        userLibraryRepository.delete(entry);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Long> getCompletedChapterIds(Long userId, Long contentId) {
        return progressRepository.findByUserIdAndContentId(userId, contentId)
                .stream()
                .filter(p -> Boolean.TRUE.equals(p.getIsCompleted()))
                .map(p -> p.getChapter().getId())
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public boolean toggleChapterProgress(Long userId, Long chapterId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng #" + userId));
        Chapter chapter = chapterRepository.findById(chapterId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy chương/tập #" + chapterId));

        Optional<ReadingWatchingProgress> existing = progressRepository.findByUserIdAndChapterId(userId, chapterId);
        if (existing.isPresent()) {
            ReadingWatchingProgress progress = existing.get();
            progress.setIsCompleted(!Boolean.TRUE.equals(progress.getIsCompleted()));
            return progressRepository.save(progress).getIsCompleted();
        } else {
            ReadingWatchingProgress progress = ReadingWatchingProgress.builder()
                    .user(user)
                    .content(chapter.getContent())
                    .chapter(chapter)
                    .isCompleted(true)
                    .build();
            return progressRepository.save(progress).getIsCompleted();
        }
    }

    private void syncFavoriteTable(User user, Content content, boolean favorite) {
        Optional<Favorite> existing = favoriteRepository.findByUserIdAndContentId(user.getId(), content.getId());
        if (favorite && existing.isEmpty()) {
            favoriteRepository.save(Favorite.builder().user(user).content(content).build());
        } else if (!favorite && existing.isPresent()) {
            favoriteRepository.delete(existing.get());
        }
    }
}

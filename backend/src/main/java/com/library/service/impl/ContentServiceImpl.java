package com.library.service.impl;

import com.library.dto.request.ChapterRequest;
import com.library.dto.request.ContentRequest;
import com.library.dto.response.ChapterResponse;
import com.library.dto.response.ContentResponse;
import com.library.dto.response.PageResponse;
import com.library.entity.*;
import com.library.enums.ContentStatus;
import com.library.enums.ContentType;
import com.library.enums.ContentVisibility;
import com.library.exception.BadRequestException;
import com.library.exception.ResourceNotFoundException;
import com.library.repository.*;
import com.library.service.ContentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
public class ContentServiceImpl implements ContentService {

    private final ContentRepository contentRepository;
    private final GenreRepository genreRepository;
    private final ChapterRepository chapterRepository;
    private final SeasonRepository seasonRepository;
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public PageResponse<ContentResponse> searchContents(
            String keyword,
            ContentType contentType,
            ContentStatus status,
            Long genreId,
            Long currentUserId,
            Pageable pageable
    ) {
        String normalizedKeyword = (keyword != null && !keyword.isBlank()) ? keyword.trim() : null;
        Page<Content> page = contentRepository.searchAccessibleContents(
                normalizedKeyword,
                contentType,
                status,
                genreId,
                currentUserId,
                pageable
        );
        Page<ContentResponse> mapped = page.map(c -> ContentResponse.fromEntity(
                c,
                reviewRepository.calculateAverageRating(c.getId()),
                true
        ));
        return PageResponse.fromPage(mapped);
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<ContentResponse> getAllContentsForAdmin(Pageable pageable) {
        Page<Content> page = contentRepository.findAll(pageable);
        Page<ContentResponse> mapped = page.map(c -> ContentResponse.fromEntity(
                c,
                reviewRepository.calculateAverageRating(c.getId()),
                true
        ));
        return PageResponse.fromPage(mapped);
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<ContentResponse> getMyPublishedContents(Long userId, Pageable pageable) {
        Page<Content> page = contentRepository.findByCreatedById(userId, pageable);
        Page<ContentResponse> mapped = page.map(c -> ContentResponse.fromEntity(
                c,
                reviewRepository.calculateAverageRating(c.getId()),
                true
        ));
        return PageResponse.fromPage(mapped);
    }

    private void verifyOwnerOrAdmin(Content content, Long actorUserId, boolean isAdmin) {
        if (isAdmin) {
            return;
        }
        boolean isOwner = actorUserId != null
                && content.getCreatedBy() != null
                && content.getCreatedBy().getId().equals(actorUserId);
        if (!isOwner) {
            throw new BadRequestException("Chỉ chính người dùng đã đăng tác phẩm này hoặc Quản trị viên (ADMIN) mới có quyền chỉnh sửa / cập nhật.");
        }
    }

    @Override
    @Transactional(readOnly = true)
    public ContentResponse getContentDetail(Long id, Long currentUserId, boolean isAdmin) {
        Content content = contentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy truyện/phim #" + id));

        if (!isAdmin && content.getVisibility() == ContentVisibility.PRIVATE) {
            boolean isCreator = currentUserId != null
                    && content.getCreatedBy() != null
                    && content.getCreatedBy().getId().equals(currentUserId);
            if (!isCreator) {
                throw new BadRequestException("Nội dung này đang ở chế độ Riêng tư (Private)");
            }
        }

        Double avgRating = reviewRepository.calculateAverageRating(content.getId());
        return ContentResponse.fromEntity(content, avgRating, true);
    }

    @Override
    @Transactional
    public ContentResponse createContent(ContentRequest request, Long creatorUserId) {
        User creator = userRepository.findById(creatorUserId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng #" + creatorUserId));

        Set<Genre> genres = new HashSet<>();
        if (request.getGenreIds() != null && !request.getGenreIds().isEmpty()) {
            genres.addAll(genreRepository.findAllById(request.getGenreIds()));
        }

        Content content = Content.builder()
                .title(request.getTitle().trim())
                .contentType(request.getContentType())
                .isSeries(request.getIsSeries() != null ? request.getIsSeries() : true)
                .posterUrl(request.getPosterUrl())
                .authorOrDirector(request.getAuthorOrDirector())
                .description(request.getDescription())
                .status(request.getStatus() != null ? request.getStatus() : ContentStatus.ONGOING)
                .externalMainLink(request.getExternalMainLink())
                .visibility(request.getVisibility() != null ? request.getVisibility() : ContentVisibility.PUBLIC)
                .createdBy(creator)
                .genres(genres)
                .build();

        Content saved;
        try {
            saved = contentRepository.save(content);
        } catch (Exception ex) {
            String msg = ex.getMessage() != null ? ex.getMessage() : "";
            if (msg.contains("Data truncation") || msg.contains("too long")) {
                log.warn("posterUrl exceeded column limit. Falling back to truncated posterUrl: {}", ex.getMessage());
                content.setPosterUrl(null);
                saved = contentRepository.save(content);
            } else {
                throw ex;
            }
        }

        if (request.getChapters() != null && !request.getChapters().isEmpty()) {
            int order = 1;
            for (ChapterRequest chReq : request.getChapters()) {
                Chapter chapter = Chapter.builder()
                        .content(saved)
                        .chapterNumber(chReq.getChapterNumber())
                        .displayOrder(chReq.getDisplayOrder() != null ? chReq.getDisplayOrder() : order++)
                        .title(chReq.getTitle())
                        .externalLink(chReq.getExternalLink())
                        .notes(chReq.getNotes())
                        .build();
                saved.getChapters().add(chapterRepository.save(chapter));
            }
        }

        return ContentResponse.fromEntity(saved, 0.0, true);
    }

    @Override
    @Transactional
    public ContentResponse updateContent(Long id, ContentRequest request, Long actorUserId, boolean isAdmin) {
        Content content = contentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy truyện/phim #" + id));

        verifyOwnerOrAdmin(content, actorUserId, isAdmin);

        content.setTitle(request.getTitle().trim());
        content.setContentType(request.getContentType());
        if (request.getIsSeries() != null) content.setIsSeries(request.getIsSeries());
        if (request.getPosterUrl() != null) content.setPosterUrl(request.getPosterUrl());
        if (request.getAuthorOrDirector() != null) content.setAuthorOrDirector(request.getAuthorOrDirector());
        if (request.getDescription() != null) content.setDescription(request.getDescription());
        if (request.getStatus() != null) content.setStatus(request.getStatus());
        if (request.getExternalMainLink() != null) content.setExternalMainLink(request.getExternalMainLink());
        if (request.getVisibility() != null) content.setVisibility(request.getVisibility());

        if (request.getGenreIds() != null) {
            Set<Genre> genres = new HashSet<>(genreRepository.findAllById(request.getGenreIds()));
            content.setGenres(genres);
        }

        if (request.getChapters() != null) {
            content.getChapters().clear();
            int order = 1;
            for (ChapterRequest chReq : request.getChapters()) {
                Chapter chapter = Chapter.builder()
                        .content(content)
                        .chapterNumber(chReq.getChapterNumber())
                        .displayOrder(chReq.getDisplayOrder() != null ? chReq.getDisplayOrder() : order++)
                        .title(chReq.getTitle())
                        .externalLink(chReq.getExternalLink())
                        .notes(chReq.getNotes())
                        .build();
                content.getChapters().add(chapterRepository.save(chapter));
            }
        }

        Content saved;
        try {
            saved = contentRepository.save(content);
        } catch (Exception ex) {
            String msg = ex.getMessage() != null ? ex.getMessage() : "";
            if (msg.contains("Data truncation") || msg.contains("too long")) {
                log.warn("posterUrl exceeded column limit. Falling back to truncated posterUrl: {}", ex.getMessage());
                content.setPosterUrl(null);
                saved = contentRepository.save(content);
            } else {
                throw ex;
            }
        }
        Double avgRating = reviewRepository.calculateAverageRating(saved.getId());
        return ContentResponse.fromEntity(saved, avgRating, true);
    }

    @Override
    @Transactional
    public void deleteContent(Long id, Long actorUserId, boolean isAdmin) {
        Content content = contentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy truyện/phim #" + id));
        verifyOwnerOrAdmin(content, actorUserId, isAdmin);
        contentRepository.delete(content);
    }

    @Override
    @Transactional
    public ChapterResponse addChapter(Long contentId, ChapterRequest request, Long actorUserId, boolean isAdmin) {
        Content content = contentRepository.findById(contentId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy truyện/phim #" + contentId));

        verifyOwnerOrAdmin(content, actorUserId, isAdmin);

        Season season = null;
        if (request.getSeasonId() != null) {
            season = seasonRepository.findById(request.getSeasonId())
                    .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy mùa #" + request.getSeasonId()));
        }

        Chapter chapter = Chapter.builder()
                .content(content)
                .season(season)
                .chapterNumber(request.getChapterNumber())
                .displayOrder(request.getDisplayOrder() != null ? request.getDisplayOrder() : 1)
                .title(request.getTitle())
                .externalLink(request.getExternalLink())
                .notes(request.getNotes())
                .build();

        return ChapterResponse.fromEntity(chapterRepository.save(chapter));
    }

    @Override
    @Transactional
    public ChapterResponse updateChapter(Long chapterId, ChapterRequest request, Long actorUserId, boolean isAdmin) {
        Chapter chapter = chapterRepository.findById(chapterId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy chương/tập #" + chapterId));

        verifyOwnerOrAdmin(chapter.getContent(), actorUserId, isAdmin);

        if (request.getChapterNumber() != null) chapter.setChapterNumber(request.getChapterNumber());
        if (request.getDisplayOrder() != null) chapter.setDisplayOrder(request.getDisplayOrder());
        if (request.getTitle() != null) chapter.setTitle(request.getTitle());
        if (request.getExternalLink() != null) chapter.setExternalLink(request.getExternalLink());
        if (request.getNotes() != null) chapter.setNotes(request.getNotes());

        return ChapterResponse.fromEntity(chapterRepository.save(chapter));
    }

    @Override
    @Transactional
    public void deleteChapter(Long chapterId, Long actorUserId, boolean isAdmin) {
        Chapter chapter = chapterRepository.findById(chapterId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy chương/tập #" + chapterId));
        verifyOwnerOrAdmin(chapter.getContent(), actorUserId, isAdmin);
        chapterRepository.delete(chapter);
    }
}

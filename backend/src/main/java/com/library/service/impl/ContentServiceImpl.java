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
import org.springframework.jdbc.core.JdbcTemplate;
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
    private final JdbcTemplate jdbcTemplate;

    @Override
    @Transactional(readOnly = true)
    public PageResponse<ContentResponse> searchContents(
            String keyword,
            ContentType contentType,
            ContentStatus status,
            Long genreId,
            Long currentUserId,
            String currentUsername,
            Pageable pageable
    ) {
        String normalizedKeyword = (keyword != null && !keyword.isBlank()) ? keyword.trim() : null;
        String normalizedUsername = (currentUsername != null && !currentUsername.isBlank())
                ? currentUsername.trim().replace("@", "").toLowerCase()
                : null;
        Page<Content> page = contentRepository.searchAccessibleContents(
                normalizedKeyword,
                contentType,
                status,
                genreId,
                currentUserId,
                normalizedUsername,
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
    public PageResponse<ContentResponse> searchContents(
            String keyword,
            ContentType contentType,
            ContentStatus status,
            Long genreId,
            Long currentUserId,
            Pageable pageable
    ) {
        return searchContents(keyword, contentType, status, genreId, currentUserId, null, pageable);
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
    public ContentResponse getContentDetail(Long id, Long currentUserId, String currentUsername, boolean isAdmin) {
        Content content = contentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy truyện/phim #" + id));

        if (!isAdmin) {
            boolean isCreator = currentUserId != null
                    && content.getCreatedBy() != null
                    && content.getCreatedBy().getId().equals(currentUserId);

            if (content.getVisibility() == ContentVisibility.PRIVATE) {
                if (!isCreator) {
                    throw new BadRequestException("Nội dung này đang ở chế độ Riêng tư (Private)");
                }
            } else if (content.getVisibility() == ContentVisibility.SHARED) {
                boolean isShared = false;
                if (currentUsername != null && content.getSharedUsers() != null) {
                    String clean = currentUsername.trim().replace("@", "").toLowerCase();
                    isShared = java.util.Arrays.stream(content.getSharedUsers().toLowerCase().split(","))
                            .map(s -> s.trim().replace("@", ""))
                            .anyMatch(u -> u.equals(clean));
                }
                if (!isCreator && !isShared) {
                    throw new BadRequestException("Nội dung này được chia sẻ riêng, bạn không có quyền truy cập");
                }
            }
        }

        Double avgRating = reviewRepository.calculateAverageRating(content.getId());
        return ContentResponse.fromEntity(content, avgRating, true);
    }

    @Override
    @Transactional(readOnly = true)
    public ContentResponse getContentDetail(Long id, Long currentUserId, boolean isAdmin) {
        return getContentDetail(id, currentUserId, null, isAdmin);
    }

    @Override
    @Transactional(readOnly = true)
    public ContentResponse getContentByTitle(String title, Long actorUserId, String actorUsername, boolean isAdmin) {
        if (title == null || title.isBlank()) {
            throw new BadRequestException("Tiêu đề tác phẩm không được để trống");
        }
        String clean = title.trim();
        var matches = contentRepository.findAll().stream()
                .filter(c -> c.getTitle() != null && c.getTitle().trim().equalsIgnoreCase(clean))
                .sorted((a, b) -> b.getId().compareTo(a.getId()))
                .toList();

        if (matches.isEmpty()) {
            throw new ResourceNotFoundException("Không tìm thấy tác phẩm với tiêu đề: " + title);
        }

        Content content = matches.get(0);
        return getContentDetail(content.getId(), actorUserId, actorUsername, isAdmin);
    }

    @Override
    @Transactional
    public ContentResponse createContent(ContentRequest request, Long creatorUserId) {
        User creator = userRepository.findById(creatorUserId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng #" + creatorUserId));

        if (request.getTitle() != null && !request.getTitle().isBlank()) {
            String cleanTitle = request.getTitle().trim();
            var existingOpt = contentRepository.findAll().stream()
                    .filter(c -> c.getTitle() != null && c.getTitle().trim().equalsIgnoreCase(cleanTitle))
                    .filter(c -> c.getCreatedBy() != null && c.getCreatedBy().getId().equals(creatorUserId))
                    .findFirst();
            if (existingOpt.isPresent()) {
                log.info("Content with title '{}' already exists for creator #{}. Updating existing content #{} instead of duplicating.", cleanTitle, creatorUserId, existingOpt.get().getId());
                return updateContent(existingOpt.get().getId(), request, creatorUserId, true);
            }
        }

        Set<Genre> genres = new HashSet<>();
        if (request.getGenreIds() != null && !request.getGenreIds().isEmpty()) {
            genres.addAll(genreRepository.findAllById(request.getGenreIds()));
        }

        String sharedUsersStr = null;
        if (request.getSharedWithUsers() != null && !request.getSharedWithUsers().isEmpty()) {
            sharedUsersStr = String.join(",", request.getSharedWithUsers());
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
                .sharedUsers(sharedUsersStr)
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
                        java.util.Map<String, Season> seasonMap = new java.util.HashMap<>();
            int order = 1;
            for (ChapterRequest chReq : request.getChapters()) {
                if (chReq.getExternalLink() == null || chReq.getExternalLink().isBlank()) {
                    continue;
                }
                java.math.BigDecimal chNum = chReq.getChapterNumber() != null ? chReq.getChapterNumber() : java.math.BigDecimal.valueOf(order);

                Season season = null;
                if (chReq.getSeasonTitle() != null && !chReq.getSeasonTitle().isBlank()) {
                    String sTitle = chReq.getSeasonTitle().trim();
                    if (!seasonMap.containsKey(sTitle)) {
                        int sNum = chReq.getSeasonNumber() != null ? chReq.getSeasonNumber() : (seasonMap.size() + 1);
                        Season s = Season.builder()
                                .content(saved)
                                .seasonNumber(sNum)
                                .title(sTitle)
                                .build();
                        seasonMap.put(sTitle, seasonRepository.save(s));
                    }
                    season = seasonMap.get(sTitle);
                }

                Chapter chapter = Chapter.builder()
                        .content(saved)
                        .season(season)
                        .chapterNumber(chNum)
                        .displayOrder(chReq.getDisplayOrder() != null ? chReq.getDisplayOrder() : order++)
                        .title(chReq.getTitle() != null && !chReq.getTitle().isBlank() ? chReq.getTitle() : "Tập " + chNum)
                        .externalLink(chReq.getExternalLink().trim())
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
        if (request.getPosterUrl() != null && !request.getPosterUrl().isBlank()) {
            String pUrl = request.getPosterUrl().trim();
            if (pUrl.startsWith("http://") || pUrl.startsWith("https://") || pUrl.startsWith("data:image/")) {
                content.setPosterUrl(pUrl);
            }
        }
        if (request.getAuthorOrDirector() != null) content.setAuthorOrDirector(request.getAuthorOrDirector());
        if (request.getDescription() != null) content.setDescription(request.getDescription());
        if (request.getStatus() != null) content.setStatus(request.getStatus());
        if (request.getExternalMainLink() != null) content.setExternalMainLink(request.getExternalMainLink());
        if (request.getVisibility() != null) content.setVisibility(request.getVisibility());
        if (request.getSharedWithUsers() != null) {
            content.setSharedUsers(String.join(",", request.getSharedWithUsers()));
        }

        if (request.getGenreIds() != null) {
            Set<Genre> genres = new HashSet<>(genreRepository.findAllById(request.getGenreIds()));
            content.setGenres(genres);
        }

        if (request.getChapters() != null) {
            content.getChapters().clear();
            java.util.Map<String, Season> seasonMap = new java.util.HashMap<>();
            int order = 1;
            for (ChapterRequest chReq : request.getChapters()) {
                if (chReq.getExternalLink() == null || chReq.getExternalLink().isBlank()) {
                    continue;
                }
                java.math.BigDecimal chNum = chReq.getChapterNumber() != null ? chReq.getChapterNumber() : java.math.BigDecimal.valueOf(order);

                Season season = null;
                if (chReq.getSeasonTitle() != null && !chReq.getSeasonTitle().isBlank()) {
                    String sTitle = chReq.getSeasonTitle().trim();
                    if (!seasonMap.containsKey(sTitle)) {
                        int sNum = chReq.getSeasonNumber() != null ? chReq.getSeasonNumber() : (seasonMap.size() + 1);
                        Season s = Season.builder()
                                .content(content)
                                .seasonNumber(sNum)
                                .title(sTitle)
                                .build();
                        seasonMap.put(sTitle, seasonRepository.save(s));
                    }
                    season = seasonMap.get(sTitle);
                }

                Chapter chapter = Chapter.builder()
                        .content(content)
                        .season(season)
                        .chapterNumber(chNum)
                        .displayOrder(chReq.getDisplayOrder() != null ? chReq.getDisplayOrder() : order++)
                        .title(chReq.getTitle() != null && !chReq.getTitle().isBlank() ? chReq.getTitle() : "Tập " + chNum)
                        .externalLink(chReq.getExternalLink().trim())
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
        deleteContentCascade(id);
    }

    private void deleteContentCascade(Long contentId) {
        log.info("Executing safe cascade delete for content #{}", contentId);
        try {
            jdbcTemplate.update("UPDATE messages SET shared_content_id = NULL WHERE shared_content_id = ?", contentId);
        } catch (Exception e) {
            log.warn("Notice updating messages for content #{}: {}", contentId, e.getMessage());
        }

        try {
            jdbcTemplate.update("UPDATE message_attachments SET content_id = NULL WHERE content_id = ?", contentId);
        } catch (Exception e) {
            log.warn("Notice updating message_attachments for content #{}: {}", contentId, e.getMessage());
        }

        try {
            jdbcTemplate.update("DELETE FROM reading_progress WHERE content_id = ?", contentId);
        } catch (Exception e) {
            log.warn("Notice deleting reading_progress for content #{}: {}", contentId, e.getMessage());
        }

        try {
            jdbcTemplate.update("DELETE FROM reviews WHERE content_id = ?", contentId);
        } catch (Exception e) {
            log.warn("Notice deleting reviews for content #{}: {}", contentId, e.getMessage());
        }

        try {
            jdbcTemplate.update("DELETE FROM sharing_permissions WHERE user_library_id IN (SELECT id FROM user_libraries WHERE content_id = ?)", contentId);
        } catch (Exception e) {
            log.warn("Notice deleting sharing_permissions for content #{}: {}", contentId, e.getMessage());
        }

        try {
            jdbcTemplate.update("DELETE FROM user_libraries WHERE content_id = ?", contentId);
        } catch (Exception e) {
            log.warn("Notice deleting user_libraries for content #{}: {}", contentId, e.getMessage());
        }

        try {
            jdbcTemplate.update("DELETE FROM user_favorites WHERE content_id = ?", contentId);
        } catch (Exception e) {
            log.warn("Notice deleting user_favorites for content #{}: {}", contentId, e.getMessage());
        }

        try {
            jdbcTemplate.update("DELETE FROM reports WHERE target_type = 'CONTENT' AND target_id = ?", contentId);
        } catch (Exception e) {
            log.warn("Notice deleting reports for content #{}: {}", contentId, e.getMessage());
        }

        try {
            jdbcTemplate.update("DELETE FROM chapters WHERE content_id = ?", contentId);
        } catch (Exception e) {
            log.warn("Notice deleting chapters for content #{}: {}", contentId, e.getMessage());
        }

        try {
            jdbcTemplate.update("DELETE FROM seasons WHERE content_id = ?", contentId);
        } catch (Exception e) {
            log.warn("Notice deleting seasons for content #{}: {}", contentId, e.getMessage());
        }

        try {
            jdbcTemplate.update("DELETE FROM content_links WHERE content_id = ?", contentId);
        } catch (Exception e) {
            log.warn("Notice deleting content_links for content #{}: {}", contentId, e.getMessage());
        }

        try {
            jdbcTemplate.update("DELETE FROM content_genres WHERE content_id = ?", contentId);
        } catch (Exception e) {
            log.warn("Notice deleting content_genres for content #{}: {}", contentId, e.getMessage());
        }

        int affected = jdbcTemplate.update("DELETE FROM contents WHERE id = ?", contentId);
        log.info("Successfully deleted content #{} from MySQL, affected rows: {}", contentId, affected);
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

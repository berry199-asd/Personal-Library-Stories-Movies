package com.library.controller;

import com.library.config.DatabaseSchemaUpdater;
import com.library.dto.request.ChapterRequest;
import com.library.dto.request.ContentRequest;
import com.library.dto.response.ApiResponse;
import com.library.dto.response.ChapterResponse;
import com.library.dto.response.ContentResponse;
import com.library.dto.response.PageResponse;
import com.library.enums.ContentStatus;
import com.library.enums.ContentType;
import com.library.enums.RoleType;
import com.library.repository.ContentRepository;
import com.library.repository.UserRepository;
import com.library.security.CustomUserDetails;
import com.library.service.ContentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/contents")
@RequiredArgsConstructor
public class ContentController {

    private final ContentService contentService;
    private final UserRepository userRepository;
    private final ContentRepository contentRepository;
    private final DatabaseSchemaUpdater databaseSchemaUpdater;
    private final JdbcTemplate jdbcTemplate;

    @GetMapping("/fix-schema")
    public ResponseEntity<Map<String, Object>> triggerSchemaMigration() {
        databaseSchemaUpdater.migratePosterUrlToLongText();
        String dataType = null;
        try {
            dataType = jdbcTemplate.queryForObject(
                    "SELECT DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'contents' AND COLUMN_NAME = 'poster_url' LIMIT 1",
                    String.class
            );
        } catch (Exception ignored) {}

        Map<String, Object> res = new LinkedHashMap<>();
        res.put("success", true);
        res.put("posterUrlDataType", dataType);
        res.put("message", "Schema check & migration executed");
        return ResponseEntity.ok(res);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<ContentResponse>>> searchContents(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) ContentType contentType,
            @RequestParam(required = false) ContentStatus status,
            @RequestParam(required = false) Long genreId,
            @RequestParam(required = false) String currentUsername,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "updatedAt"));
        Long userId = currentUser != null ? currentUser.getId() : null;
        String username = currentUser != null ? currentUser.getUsername() : currentUsername;
        if (userId == null && username != null && !username.isBlank()) {
            String clean = username.trim().replace("@", "").toLowerCase();
            var u = userRepository.findByUsername(clean);
            if (u.isPresent()) {
                userId = u.get().getId();
                username = u.get().getUsername();
            }
        }
        PageResponse<ContentResponse> result = contentService.searchContents(
                keyword, contentType, status, genreId, userId, username, pageable
        );
        return ResponseEntity.ok(ApiResponse.ok("Lấy danh sách truyện/phim thành công", result));
    }

    @GetMapping("/my-published")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<ApiResponse<PageResponse<ContentResponse>>> getMyPublishedContents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "updatedAt"));
        PageResponse<ContentResponse> result = contentService.getMyPublishedContents(currentUser.getId(), pageable);
        return ResponseEntity.ok(ApiResponse.ok("Lấy danh sách truyện/phim do bạn đăng tải thành công", result));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ContentResponse>> getContentDetail(
            @PathVariable Long id,
            @RequestParam(required = false) String currentUsername,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        Long userId = currentUser != null ? currentUser.getId() : null;
        String username = currentUser != null ? currentUser.getUsername() : currentUsername;
        boolean isAdmin = currentUser != null && currentUser.getRole() == RoleType.ADMIN;
        if (userId == null && username != null && !username.isBlank()) {
            String clean = username.trim().replace("@", "").toLowerCase();
            var u = userRepository.findByUsername(clean);
            if (u.isPresent()) {
                userId = u.get().getId();
                username = u.get().getUsername();
                if (u.get().getRole() == RoleType.ADMIN) {
                    isAdmin = true;
                }
            }
        }
        ContentResponse detail = contentService.getContentDetail(id, userId, username, isAdmin);
        return ResponseEntity.ok(ApiResponse.ok("Lấy chi tiết tác phẩm thành công", detail));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ContentResponse>> publishContent(
            @Valid @RequestBody ContentRequest request,
            @AuthenticationPrincipal CustomUserDetails currentUser,
            @RequestParam(required = false) String creatorUsername
    ) {
        Long userId = null;
        if (currentUser != null) {
            userId = currentUser.getId();
        } else if (creatorUsername != null && !creatorUsername.isBlank()) {
            String clean = creatorUsername.trim().replace("@", "").toLowerCase();
            userId = userRepository.findByUsername(clean).map(com.library.entity.User::getId).orElse(null);
        }
        if (userId == null) {
            userId = userRepository.findAll().stream().findFirst().map(com.library.entity.User::getId).orElse(1L);
        }
        ContentResponse created = contentService.createContent(request, userId);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Đăng tải truyện/phim thành công", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ContentResponse>> updateOwnOrManagedContent(
            @PathVariable Long id,
            @Valid @RequestBody ContentRequest request,
            @RequestParam(required = false) String actorUsername,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        boolean isAdmin = (currentUser != null && currentUser.getRole() == RoleType.ADMIN);
        Long actorId = currentUser != null ? currentUser.getId() : null;

        if (!isAdmin && actorUsername != null && !actorUsername.isBlank()) {
            String clean = actorUsername.trim().replace("@", "").toLowerCase();
            var u = userRepository.findByUsername(clean);
            if (u.isPresent()) {
                actorId = u.get().getId();
                if (u.get().getRole() == RoleType.ADMIN) {
                    isAdmin = true;
                }
            }
        }

        if (actorId == null) {
            actorId = contentRepository.findById(id).map(c -> c.getCreatedBy() != null ? c.getCreatedBy().getId() : 1L).orElse(1L);
            isAdmin = true;
        }

        ContentResponse updated = contentService.updateContent(id, request, actorId, isAdmin);
        return ResponseEntity.ok(ApiResponse.ok("Cập nhật thông tin truyện/phim đã đăng thành công", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteOwnOrManagedContent(
            @PathVariable Long id,
            @RequestParam(required = false) String actorUsername,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        boolean isAdmin = (currentUser != null && currentUser.getRole() == RoleType.ADMIN);
        Long actorId = currentUser != null ? currentUser.getId() : null;

        if (!isAdmin && actorUsername != null && !actorUsername.isBlank()) {
            String clean = actorUsername.trim().replace("@", "").toLowerCase();
            var u = userRepository.findByUsername(clean);
            if (u.isPresent()) {
                actorId = u.get().getId();
                if (u.get().getRole() == RoleType.ADMIN) {
                    isAdmin = true;
                }
            }
        }

        contentService.deleteContent(id, actorId, isAdmin);
        return ResponseEntity.ok(ApiResponse.ok("Đã xóa truyện/phim đã đăng thành công", null));
    }

    @DeleteMapping("/by-title")
    public ResponseEntity<ApiResponse<Void>> deleteByTitle(
            @RequestParam String title,
            @RequestParam(required = false) String actorUsername,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        boolean isAdmin = (currentUser != null && currentUser.getRole() == RoleType.ADMIN);
        Long actorId = currentUser != null ? currentUser.getId() : null;

        if (!isAdmin && actorUsername != null && !actorUsername.isBlank()) {
            String clean = actorUsername.trim().replace("@", "").toLowerCase();
            var u = userRepository.findByUsername(clean);
            if (u.isPresent()) {
                actorId = u.get().getId();
                if (u.get().getRole() == RoleType.ADMIN) {
                    isAdmin = true;
                }
            }
        }

        if (title != null && !title.isBlank()) {
            String clean = title.trim();
            var matches = contentRepository.findAll().stream()
                    .filter(c -> c.getTitle().trim().equalsIgnoreCase(clean))
                    .toList();
            for (var c : matches) {
                contentService.deleteContent(c.getId(), actorId, isAdmin);
            }
        }
        return ResponseEntity.ok(ApiResponse.ok("Đã xóa truyện/phim theo tiêu đề thành công", null));
    }

    @PostMapping("/{contentId}/chapters")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<ApiResponse<ChapterResponse>> addChapterToOwnContent(
            @PathVariable Long contentId,
            @Valid @RequestBody ChapterRequest request,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        boolean isAdmin = currentUser.getRole() == RoleType.ADMIN;
        ChapterResponse created = contentService.addChapter(contentId, request, currentUser.getId(), isAdmin);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Thêm chương/tập mới cho tác phẩm thành công", created));
    }

    @PutMapping("/{contentId}/chapters/{chapterId}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<ApiResponse<ChapterResponse>> updateOwnChapter(
            @PathVariable Long contentId,
            @PathVariable Long chapterId,
            @Valid @RequestBody ChapterRequest request,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        boolean isAdmin = currentUser.getRole() == RoleType.ADMIN;
        ChapterResponse updated = contentService.updateChapter(chapterId, request, currentUser.getId(), isAdmin);
        return ResponseEntity.ok(ApiResponse.ok("Cập nhật chương/tập thành công", updated));
    }

    @DeleteMapping("/{contentId}/chapters/{chapterId}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteOwnChapter(
            @PathVariable Long contentId,
            @PathVariable Long chapterId,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        boolean isAdmin = currentUser.getRole() == RoleType.ADMIN;
        contentService.deleteChapter(chapterId, currentUser.getId(), isAdmin);
        return ResponseEntity.ok(ApiResponse.ok("Đã xóa chương/tập khỏi tác phẩm", null));
    }
}

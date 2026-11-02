package com.library.controller;

import com.library.dto.request.ChapterRequest;
import com.library.dto.request.ContentRequest;
import com.library.dto.response.ApiResponse;
import com.library.dto.response.ChapterResponse;
import com.library.dto.response.ContentResponse;
import com.library.dto.response.PageResponse;
import com.library.enums.ContentStatus;
import com.library.enums.ContentType;
import com.library.enums.RoleType;
import com.library.security.CustomUserDetails;
import com.library.service.ContentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contents")
@RequiredArgsConstructor
public class ContentController {

    private final ContentService contentService;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<ContentResponse>>> searchContents(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) ContentType contentType,
            @RequestParam(required = false) ContentStatus status,
            @RequestParam(required = false) Long genreId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "updatedAt"));
        Long userId = currentUser != null ? currentUser.getId() : null;
        PageResponse<ContentResponse> result = contentService.searchContents(
                keyword, contentType, status, genreId, userId, pageable
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
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        Long userId = currentUser != null ? currentUser.getId() : null;
        boolean isAdmin = currentUser != null && currentUser.getRole() == RoleType.ADMIN;
        ContentResponse detail = contentService.getContentDetail(id, userId, isAdmin);
        return ResponseEntity.ok(ApiResponse.ok("Lấy chi tiết tác phẩm thành công", detail));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<ApiResponse<ContentResponse>> publishContent(
            @Valid @RequestBody ContentRequest request,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        ContentResponse created = contentService.createContent(request, currentUser.getId());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Đăng tải truyện/phim thành công", created));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<ApiResponse<ContentResponse>> updateOwnOrManagedContent(
            @PathVariable Long id,
            @Valid @RequestBody ContentRequest request,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        boolean isAdmin = currentUser.getRole() == RoleType.ADMIN;
        ContentResponse updated = contentService.updateContent(id, request, currentUser.getId(), isAdmin);
        return ResponseEntity.ok(ApiResponse.ok("Cập nhật thông tin truyện/phim đã đăng thành công", updated));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteOwnOrManagedContent(
            @PathVariable Long id,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        boolean isAdmin = currentUser.getRole() == RoleType.ADMIN;
        contentService.deleteContent(id, currentUser.getId(), isAdmin);
        return ResponseEntity.ok(ApiResponse.ok("Đã xóa truyện/phim đã đăng thành công", null));
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

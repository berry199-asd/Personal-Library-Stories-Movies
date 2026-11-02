package com.library.controller;

import com.library.dto.request.ChapterRequest;
import com.library.dto.request.ContentRequest;
import com.library.dto.response.ApiResponse;
import com.library.dto.response.ChapterResponse;
import com.library.dto.response.ContentResponse;
import com.library.dto.response.PageResponse;
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
@RequestMapping("/api/admin/contents")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class AdminContentController {

    private final ContentService contentService;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<ContentResponse>>> listAllContents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "updatedAt"));
        return ResponseEntity.ok(ApiResponse.ok(
                "Quản trị viên: Lấy toàn bộ danh sách truyện/phim thành công",
                contentService.getAllContentsForAdmin(pageable)
        ));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ContentResponse>> createContentByAdmin(
            @Valid @RequestBody ContentRequest request,
            @AuthenticationPrincipal CustomUserDetails adminUser
    ) {
        ContentResponse created = contentService.createContent(request, adminUser.getId());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Quản trị viên: Thêm truyện/phim mới thành công", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ContentResponse>> updateContentByAdmin(
            @PathVariable Long id,
            @Valid @RequestBody ContentRequest request,
            @AuthenticationPrincipal CustomUserDetails adminUser
    ) {
        ContentResponse updated = contentService.updateContent(id, request, adminUser.getId(), true);
        return ResponseEntity.ok(ApiResponse.ok("Quản trị viên: Cập nhật truyện/phim thành công", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteContentByAdmin(@PathVariable Long id) {
        contentService.deleteContent(id);
        return ResponseEntity.ok(ApiResponse.ok("Quản trị viên: Đã xóa truyện/phim khỏi hệ thống", null));
    }

    @PostMapping("/{contentId}/chapters")
    public ResponseEntity<ApiResponse<ChapterResponse>> addChapterByAdmin(
            @PathVariable Long contentId,
            @Valid @RequestBody ChapterRequest request
    ) {
        ChapterResponse created = contentService.addChapter(contentId, request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Quản trị viên: Thêm chương/tập mới thành công", created));
    }

    @PutMapping("/chapters/{chapterId}")
    public ResponseEntity<ApiResponse<ChapterResponse>> updateChapterByAdmin(
            @PathVariable Long chapterId,
            @Valid @RequestBody ChapterRequest request
    ) {
        return ResponseEntity.ok(ApiResponse.ok(
                "Quản trị viên: Cập nhật chương/tập thành công",
                contentService.updateChapter(chapterId, request)
        ));
    }

    @DeleteMapping("/chapters/{chapterId}")
    public ResponseEntity<ApiResponse<Void>> deleteChapterByAdmin(@PathVariable Long chapterId) {
        contentService.deleteChapter(chapterId);
        return ResponseEntity.ok(ApiResponse.ok("Quản trị viên: Đã xóa chương/tập", null));
    }
}

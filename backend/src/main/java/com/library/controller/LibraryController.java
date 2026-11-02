package com.library.controller;

import com.library.dto.request.LibraryEntryRequest;
import com.library.dto.response.ApiResponse;
import com.library.dto.response.LibraryEntryResponse;
import com.library.dto.response.PageResponse;
import com.library.enums.ContentType;
import com.library.enums.ReadingStatus;
import com.library.security.CustomUserDetails;
import com.library.service.LibraryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/library")
@PreAuthorize("hasAnyRole('USER', 'ADMIN')")
@RequiredArgsConstructor
public class LibraryController {

    private final LibraryService libraryService;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<LibraryEntryResponse>>> getMyLibrary(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) ContentType contentType,
            @RequestParam(required = false) ReadingStatus readingStatus,
            @RequestParam(required = false) Long genreId,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) Boolean favoriteOnly,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "updatedAt"));
        PageResponse<LibraryEntryResponse> result = libraryService.getMyLibrary(
                currentUser.getId(),
                keyword,
                contentType,
                readingStatus,
                genreId,
                categoryId,
                favoriteOnly,
                pageable
        );
        return ResponseEntity.ok(ApiResponse.ok("Lấy thư viện cá nhân thành công", result));
    }

    @GetMapping("/public/{username}")
    public ResponseEntity<ApiResponse<PageResponse<LibraryEntryResponse>>> getPublicLibraryByUsername(
            @PathVariable String username,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "updatedAt"));
        PageResponse<LibraryEntryResponse> result = libraryService.getPublicSharedLibraryByUsername(username, pageable);
        return ResponseEntity.ok(ApiResponse.ok("Lấy thư viện công khai của @" + username + " thành công", result));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<LibraryEntryResponse>> saveOrUpdateEntry(
            @Valid @RequestBody LibraryEntryRequest request,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        LibraryEntryResponse saved = libraryService.upsertLibraryEntry(currentUser.getId(), request);
        return ResponseEntity.ok(ApiResponse.ok("Đã cập nhật vào thư viện cá nhân", saved));
    }

    @PostMapping("/copy/{sourceLibraryEntryId}")
    public ResponseEntity<ApiResponse<LibraryEntryResponse>> copySharedEntryToMyLibrary(
            @PathVariable Long sourceLibraryEntryId,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        LibraryEntryResponse copied = libraryService.copyFromSharedEntry(currentUser.getId(), sourceLibraryEntryId);
        return ResponseEntity.ok(ApiResponse.ok("Đã lưu bản sao tham chiếu về thư viện của bạn", copied));
    }

    @DeleteMapping("/{contentId}")
    public ResponseEntity<ApiResponse<Void>> removeFromLibrary(
            @PathVariable Long contentId,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        libraryService.removeFromLibrary(currentUser.getId(), contentId);
        return ResponseEntity.ok(ApiResponse.ok("Đã xóa khỏi thư viện cá nhân", null));
    }

    @GetMapping("/{contentId}/progress")
    public ResponseEntity<ApiResponse<List<Long>>> getCompletedChapters(
            @PathVariable Long contentId,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        List<Long> completedIds = libraryService.getCompletedChapterIds(currentUser.getId(), contentId);
        return ResponseEntity.ok(ApiResponse.ok("Lấy tiến độ đọc/xem thành công", completedIds));
    }

    @PostMapping("/chapters/{chapterId}/toggle-progress")
    public ResponseEntity<ApiResponse<Map<String, Boolean>>> toggleChapterProgress(
            @PathVariable Long chapterId,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        boolean isCompleted = libraryService.toggleChapterProgress(currentUser.getId(), chapterId);
        return ResponseEntity.ok(ApiResponse.ok(
                isCompleted ? "Đã đánh dấu đã đọc/xem chương/tập" : "Đã bỏ đánh dấu đọc/xem",
                Map.of("isCompleted", isCompleted)
        ));
    }
}

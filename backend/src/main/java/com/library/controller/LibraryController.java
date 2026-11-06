package com.library.controller;

import com.library.dto.request.LibraryEntryRequest;
import com.library.dto.response.ApiResponse;
import com.library.dto.response.ContentResponse;
import com.library.dto.response.LibraryEntryResponse;
import com.library.dto.response.PageResponse;
import com.library.dto.response.ReadingProgressResponse;
import com.library.entity.User;
import com.library.enums.ContentType;
import com.library.enums.ReadingStatus;
import com.library.exception.AccessDeniedCustomException;
import com.library.exception.ResourceNotFoundException;
import com.library.repository.UserRepository;
import com.library.security.CustomUserDetails;
import com.library.service.LibraryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/library")
@RequiredArgsConstructor
public class LibraryController {

    private final LibraryService libraryService;
    private final UserRepository userRepository;

    private Long resolveUserId(CustomUserDetails currentUser, String username) {
        if (currentUser != null) {
            return currentUser.getId();
        }
        if (username != null && !username.isBlank()) {
            String clean = username.trim().replace("@", "").toLowerCase();
            return userRepository.findByUsername(clean).map(User::getId)
                    .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng @" + username));
        }
        throw new AccessDeniedCustomException("Vui lòng đăng nhập để thực hiện thao tác");
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<LibraryEntryResponse>>> getMyLibrary(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) ContentType contentType,
            @RequestParam(required = false) ReadingStatus readingStatus,
            @RequestParam(required = false) Long genreId,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) Boolean favoriteOnly,
            @RequestParam(required = false) String username,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "100") int size,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        Long userId = resolveUserId(currentUser, username);
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "updatedAt"));
        PageResponse<LibraryEntryResponse> result = libraryService.getMyLibrary(
                userId,
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

    @GetMapping("/favorites")
    public ResponseEntity<ApiResponse<List<ContentResponse>>> getFavorites(
            @RequestParam(required = false) String username,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        Long userId = resolveUserId(currentUser, username);
        List<ContentResponse> favorites = libraryService.getFavoriteContents(userId);
        return ResponseEntity.ok(ApiResponse.ok("Lấy danh sách yêu thích thành công", favorites));
    }

    @GetMapping("/favorites/ids")
    public ResponseEntity<ApiResponse<List<Long>>> getFavoriteIds(
            @RequestParam(required = false) String username,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        Long userId = resolveUserId(currentUser, username);
        List<Long> ids = libraryService.getFavoriteContentIds(userId);
        return ResponseEntity.ok(ApiResponse.ok("Lấy danh sách ID yêu thích thành công", ids));
    }

    @PostMapping("/favorites/{contentId}/toggle")
    public ResponseEntity<ApiResponse<Map<String, Object>>> toggleFavorite(
            @PathVariable Long contentId,
            @RequestParam(required = false) String username,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        Long userId = resolveUserId(currentUser, username);
        boolean isFav = libraryService.toggleFavorite(userId, contentId);
        return ResponseEntity.ok(ApiResponse.ok(
                isFav ? "Đã thêm vào danh sách yêu thích" : "Đã bỏ khỏi danh sách yêu thích",
                Map.of("contentId", contentId, "isFavorite", isFav)
        ));
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
            @RequestParam(required = false) String username,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        Long userId = resolveUserId(currentUser, username);
        LibraryEntryResponse saved = libraryService.upsertLibraryEntry(userId, request);
        return ResponseEntity.ok(ApiResponse.ok("Đã cập nhật vào thư viện cá nhân", saved));
    }

    @PostMapping("/copy/{sourceLibraryEntryId}")
    public ResponseEntity<ApiResponse<LibraryEntryResponse>> copySharedEntryToMyLibrary(
            @PathVariable Long sourceLibraryEntryId,
            @RequestParam(required = false) String username,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        Long userId = resolveUserId(currentUser, username);
        LibraryEntryResponse copied = libraryService.copyFromSharedEntry(userId, sourceLibraryEntryId);
        return ResponseEntity.ok(ApiResponse.ok("Đã lưu bản sao tham chiếu về thư viện của bạn", copied));
    }

    @DeleteMapping("/{contentId}")
    public ResponseEntity<ApiResponse<Void>> removeFromLibrary(
            @PathVariable Long contentId,
            @RequestParam(required = false) String username,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        Long userId = resolveUserId(currentUser, username);
        libraryService.removeFromLibrary(userId, contentId);
        return ResponseEntity.ok(ApiResponse.ok("Đã xóa khỏi thư viện cá nhân", null));
    }

    @GetMapping("/{contentId}/progress")
    public ResponseEntity<ApiResponse<ReadingProgressResponse>> getReadingProgress(
            @PathVariable Long contentId,
            @RequestParam(required = false) String username,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        Long userId = resolveUserId(currentUser, username);
        ReadingProgressResponse progress = libraryService.getReadingProgress(userId, contentId);
        return ResponseEntity.ok(ApiResponse.ok("Lấy tiến độ đọc/xem thành công", progress));
    }

    @PostMapping("/chapters/{chapterId}/toggle-progress")
    public ResponseEntity<ApiResponse<Map<String, Object>>> toggleChapterProgress(
            @PathVariable Long chapterId,
            @RequestParam(required = false) Long contentId,
            @RequestParam(required = false) Double chapterNumber,
            @RequestParam(required = false) String username,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        Long userId = resolveUserId(currentUser, username);
        boolean isCompleted = libraryService.toggleChapterProgress(userId, contentId, chapterId, chapterNumber);
        return ResponseEntity.ok(ApiResponse.ok(
                isCompleted ? "Đã đánh dấu đã đọc/xem chương/tập" : "Đã bỏ đánh dấu đọc/xem",
                Map.of("chapterId", chapterId, "isCompleted", isCompleted)
        ));
    }

    @PostMapping("/{contentId}/toggle-progress")
    public ResponseEntity<ApiResponse<Map<String, Object>>> toggleContentProgress(
            @PathVariable Long contentId,
            @RequestParam(required = false) Long chapterId,
            @RequestParam(required = false) Double chapterNumber,
            @RequestParam(required = false) String username,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        Long userId = resolveUserId(currentUser, username);
        boolean isCompleted = libraryService.toggleChapterProgress(userId, contentId, chapterId, chapterNumber);
        return ResponseEntity.ok(ApiResponse.ok(
                isCompleted ? "Đã đánh dấu đã đọc/xem chương/tập" : "Đã bỏ đánh dấu đọc/xem",
                Map.of("contentId", contentId, "isCompleted", isCompleted)
        ));
    }
}

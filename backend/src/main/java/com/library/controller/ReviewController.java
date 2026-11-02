package com.library.controller;

import com.library.dto.request.ReviewRequest;
import com.library.dto.response.ApiResponse;
import com.library.dto.response.PageResponse;
import com.library.dto.response.ReviewResponse;
import com.library.enums.RoleType;
import com.library.security.CustomUserDetails;
import com.library.service.ReviewService;
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
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping("/api/contents/{contentId}/reviews")
    public ResponseEntity<ApiResponse<PageResponse<ReviewResponse>>> getReviews(
            @PathVariable Long contentId,
            @RequestParam(required = false) Long chapterId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        return ResponseEntity.ok(ApiResponse.ok(
                "Lấy danh sách đánh giá & bình luận thành công",
                reviewService.getContentReviews(contentId, chapterId, pageable)
        ));
    }

    @PostMapping("/api/contents/{contentId}/reviews")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<ApiResponse<ReviewResponse>> createReview(
            @PathVariable Long contentId,
            @Valid @RequestBody ReviewRequest request,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        ReviewResponse created = reviewService.createReview(contentId, currentUser.getId(), request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Đã đăng đánh giá & bình luận", created));
    }

    @DeleteMapping("/api/reviews/{reviewId}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteReview(
            @PathVariable Long reviewId,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        boolean isAdmin = currentUser.getRole() == RoleType.ADMIN;
        reviewService.deleteReview(reviewId, currentUser.getId(), isAdmin);
        return ResponseEntity.ok(ApiResponse.ok("Đã xóa bình luận", null));
    }
}

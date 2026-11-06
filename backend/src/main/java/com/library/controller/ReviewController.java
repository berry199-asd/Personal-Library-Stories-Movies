package com.library.controller;

import com.library.dto.request.ReviewRequest;
import com.library.dto.response.ApiResponse;
import com.library.dto.response.PageResponse;
import com.library.dto.response.ReviewResponse;
import com.library.entity.User;
import com.library.enums.RoleType;
import com.library.exception.AccessDeniedCustomException;
import com.library.repository.UserRepository;
import com.library.security.CustomUserDetails;
import com.library.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;
    private final UserRepository userRepository;

    @GetMapping("/api/contents/{contentId}/reviews")
    public ResponseEntity<ApiResponse<PageResponse<ReviewResponse>>> getReviews(
            @PathVariable Long contentId,
            @RequestParam(required = false) Long chapterId,
            @RequestParam(required = false) String type,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "100") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        return ResponseEntity.ok(ApiResponse.ok(
                "Lấy danh sách đánh giá & bình luận thành công",
                reviewService.getContentReviews(contentId, chapterId, type, pageable)
        ));
    }

    @PostMapping("/api/contents/{contentId}/reviews")
    public ResponseEntity<ApiResponse<ReviewResponse>> createReview(
            @PathVariable Long contentId,
            @Valid @RequestBody ReviewRequest request,
            @RequestParam(required = false) String authorUsername,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        Long userId = null;
        if (currentUser != null) {
            userId = currentUser.getId();
        } else if (authorUsername != null && !authorUsername.isBlank()) {
            String clean = authorUsername.trim().replace("@", "").toLowerCase();
            userId = userRepository.findByUsername(clean).map(User::getId).orElse(null);
        }

        if (userId == null) {
            throw new AccessDeniedCustomException("Vui lòng đăng nhập để gửi bình luận");
        }

        ReviewResponse created = reviewService.createReview(contentId, userId, request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Đã đăng đánh giá & bình luận", created));
    }

    @DeleteMapping("/api/reviews/{reviewId}")
    public ResponseEntity<ApiResponse<Void>> deleteReview(
            @PathVariable Long reviewId,
            @RequestParam(required = false) String actorUsername,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        Long userId = null;
        boolean isAdmin = false;
        if (currentUser != null) {
            userId = currentUser.getId();
            isAdmin = currentUser.getRole() == RoleType.ADMIN;
        } else if (actorUsername != null && !actorUsername.isBlank()) {
            String clean = actorUsername.trim().replace("@", "").toLowerCase();
            User u = userRepository.findByUsername(clean).orElse(null);
            if (u != null) {
                userId = u.getId();
                isAdmin = u.getRole() == RoleType.ADMIN;
            }
        }

        if (userId == null) {
            throw new AccessDeniedCustomException("Vui lòng đăng nhập để thực hiện thao tác");
        }

        reviewService.deleteReview(reviewId, userId, isAdmin);
        return ResponseEntity.ok(ApiResponse.ok("Đã xóa bình luận", null));
    }
}

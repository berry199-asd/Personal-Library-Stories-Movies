package com.library.service;

import com.library.dto.request.ReviewRequest;
import com.library.dto.response.PageResponse;
import com.library.dto.response.ReviewResponse;
import org.springframework.data.domain.Pageable;

public interface ReviewService {
    PageResponse<ReviewResponse> getContentReviews(Long contentId, Long chapterId, Pageable pageable);
    PageResponse<ReviewResponse> getContentReviews(Long contentId, Long chapterId, String type, Pageable pageable);
    ReviewResponse createReview(Long contentId, Long userId, ReviewRequest request);
    void deleteReview(Long reviewId, Long actorUserId, boolean isAdmin);
}

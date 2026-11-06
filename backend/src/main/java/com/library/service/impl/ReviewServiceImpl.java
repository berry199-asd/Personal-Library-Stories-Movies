package com.library.service.impl;

import com.library.dto.request.ReviewRequest;
import com.library.dto.response.PageResponse;
import com.library.dto.response.ReviewResponse;
import com.library.entity.Chapter;
import com.library.entity.Content;
import com.library.entity.Review;
import com.library.entity.User;
import com.library.enums.ContentVisibility;
import com.library.enums.RoleType;
import com.library.exception.BadRequestException;
import com.library.exception.ResourceNotFoundException;
import com.library.repository.ChapterRepository;
import com.library.repository.ContentRepository;
import com.library.repository.ReviewRepository;
import com.library.repository.UserRepository;
import com.library.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final ContentRepository contentRepository;
    private final ChapterRepository chapterRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public PageResponse<ReviewResponse> getContentReviews(Long contentId, Long chapterId, Pageable pageable) {
        return getContentReviews(contentId, chapterId, null, pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<ReviewResponse> getContentReviews(Long contentId, Long chapterId, String type, Pageable pageable) {
        Page<Review> page;
        if (chapterId != null) {
            page = reviewRepository.findByChapterIdAndParentIsNull(chapterId, pageable);
        } else if ("CHAPTER".equalsIgnoreCase(type)) {
            page = reviewRepository.findByContentIdAndChapterIsNotNullAndParentIsNull(contentId, pageable);
        } else if ("ALL".equalsIgnoreCase(type)) {
            page = reviewRepository.findByContentIdAndParentIsNull(contentId, pageable);
        } else {
            page = reviewRepository.findByContentIdAndChapterIsNullAndParentIsNull(contentId, pageable);
        }
        return PageResponse.fromPage(page.map(ReviewResponse::fromEntity));
    }

    @Override
    @Transactional
    public ReviewResponse createReview(Long contentId, Long userId, ReviewRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng #" + userId));
        Content content = contentRepository.findById(contentId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy truyện/phim #" + contentId));

        // Check if comments are disabled for this content
        if (content.getDescription() != null && content.getDescription().contains("\"allowComments\":false")) {
            throw new BadRequestException("Người đăng tải đã tắt tính năng bình luận cho tác phẩm này");
        }

        // Check visibility permissions
        boolean isOwner = content.getCreatedBy() != null && content.getCreatedBy().getId().equals(userId);
        boolean isAdmin = user.getRole() == RoleType.ADMIN;
        if (content.getVisibility() == ContentVisibility.PRIVATE && !isOwner && !isAdmin) {
            throw new BadRequestException("Tác phẩm ở chế độ riêng tư, bạn không có quyền bình luận");
        }

        // Prevent duplicate comment submissions within 10 seconds
        LocalDateTime tenSecondsAgo = LocalDateTime.now().minusSeconds(10);
        String trimmedComment = request.getCommentText() != null ? request.getCommentText().trim() : "";
        if (trimmedComment.isBlank()) {
            throw new BadRequestException("Nội dung bình luận không được để trống");
        }
        if (reviewRepository.existsByContentIdAndUserIdAndCommentTextAndCreatedAtAfter(
                contentId, userId, trimmedComment, tenSecondsAgo)) {
            throw new BadRequestException("Bạn vừa gửi bình luận này, vui lòng đợi vài giây trước khi gửi tiếp");
        }

        Chapter chapter = null;
        if (request.getChapterId() != null) {
            chapter = chapterRepository.findById(request.getChapterId())
                    .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy chương/tập #" + request.getChapterId()));
        }

        Review parent = null;
        if (request.getParentId() != null) {
            parent = reviewRepository.findById(request.getParentId())
                    .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy bình luận gốc #" + request.getParentId()));
        }

        Review review = Review.builder()
                .user(user)
                .content(content)
                .chapter(chapter)
                .parent(parent)
                .rating(request.getRating())
                .commentText(trimmedComment)
                .isSpoiler(Boolean.TRUE.equals(request.getIsSpoiler()))
                .helpfulCount(0)
                .build();

        Review saved = reviewRepository.save(review);
        return ReviewResponse.fromEntity(saved);
    }

    @Override
    @Transactional
    public void deleteReview(Long reviewId, Long actorUserId, boolean isAdmin) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy bình luận #" + reviewId));
        if (!isAdmin && !review.getUser().getId().equals(actorUserId)) {
            throw new BadRequestException("Bạn chỉ có thể xóa bình luận của chính mình");
        }
        reviewRepository.delete(review);
    }
}

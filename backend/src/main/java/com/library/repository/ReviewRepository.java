package com.library.repository;

import com.library.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    Page<Review> findByContentIdAndChapterIsNullAndParentIsNull(Long contentId, Pageable pageable);

    Page<Review> findByChapterIdAndParentIsNull(Long chapterId, Pageable pageable);

    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.content.id = :contentId AND r.rating IS NOT NULL")
    Double calculateAverageRating(@Param("contentId") Long contentId);
}

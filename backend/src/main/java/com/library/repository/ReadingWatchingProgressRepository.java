package com.library.repository;

import com.library.entity.ReadingWatchingProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReadingWatchingProgressRepository extends JpaRepository<ReadingWatchingProgress, Long> {

    Optional<ReadingWatchingProgress> findByUserIdAndChapterId(Long userId, Long chapterId);

    List<ReadingWatchingProgress> findByUserIdAndContentId(Long userId, Long contentId);
}

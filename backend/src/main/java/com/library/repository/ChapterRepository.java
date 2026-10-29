package com.library.repository;

import com.library.entity.Chapter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChapterRepository extends JpaRepository<Chapter, Long> {

    List<Chapter> findByContentIdOrderByDisplayOrderAscChapterNumberAsc(Long contentId);

    List<Chapter> findBySeasonIdOrderByDisplayOrderAscChapterNumberAsc(Long seasonId);
}

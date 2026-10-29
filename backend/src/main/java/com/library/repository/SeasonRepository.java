package com.library.repository;

import com.library.entity.Season;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeasonRepository extends JpaRepository<Season, Long> {
    List<Season> findByContentIdOrderBySeasonNumberAsc(Long contentId);
}

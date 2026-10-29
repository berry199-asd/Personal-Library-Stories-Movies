package com.library.repository;

import com.library.entity.UserLibrary;
import com.library.enums.ContentType;
import com.library.enums.LibraryVisibility;
import com.library.enums.ReadingStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserLibraryRepository extends JpaRepository<UserLibrary, Long> {

    Optional<UserLibrary> findByUserIdAndContentId(Long userId, Long contentId);

    boolean existsByUserIdAndContentId(Long userId, Long contentId);

    Page<UserLibrary> findByUserId(Long userId, Pageable pageable);

    Page<UserLibrary> findByUserIdAndVisibility(Long userId, LibraryVisibility visibility, Pageable pageable);

    @Query("SELECT DISTINCT ul FROM UserLibrary ul " +
            "JOIN ul.content c " +
            "LEFT JOIN c.genres g " +
            "LEFT JOIN ul.categories cat " +
            "WHERE ul.user.id = :userId " +
            "AND (:keyword IS NULL OR LOWER(c.title) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "   OR LOWER(c.authorOrDirector) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
            "AND (:contentType IS NULL OR c.contentType = :contentType) " +
            "AND (:readingStatus IS NULL OR ul.readingStatus = :readingStatus) " +
            "AND (:genreId IS NULL OR g.id = :genreId) " +
            "AND (:categoryId IS NULL OR cat.id = :categoryId) " +
            "AND (:favoriteOnly IS NULL OR :favoriteOnly = false OR ul.isFavorite = true)")
    Page<UserLibrary> filterUserLibrary(
            @Param("userId") Long userId,
            @Param("keyword") String keyword,
            @Param("contentType") ContentType contentType,
            @Param("readingStatus") ReadingStatus readingStatus,
            @Param("genreId") Long genreId,
            @Param("categoryId") Long categoryId,
            @Param("favoriteOnly") Boolean favoriteOnly,
            Pageable pageable
    );
}

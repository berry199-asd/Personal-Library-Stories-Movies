package com.library.repository;

import com.library.entity.Content;
import com.library.enums.ContentStatus;
import com.library.enums.ContentType;
import com.library.enums.ContentVisibility;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ContentRepository extends JpaRepository<Content, Long>, JpaSpecificationExecutor<Content> {

    Page<Content> findByVisibilityIn(Iterable<ContentVisibility> visibilities, Pageable pageable);

    @Query("SELECT DISTINCT c FROM Content c " +
            "LEFT JOIN c.genres g " +
            "WHERE (:keyword IS NULL OR LOWER(c.title) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "   OR LOWER(c.authorOrDirector) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
            "AND (:contentType IS NULL OR c.contentType = :contentType) " +
            "AND (:status IS NULL OR c.status = :status) " +
            "AND (:genreId IS NULL OR g.id = :genreId) " +
            "AND (c.visibility IN ('SHARED', 'PUBLIC') OR (:currentUserId IS NOT NULL AND c.createdBy.id = :currentUserId))")
    Page<Content> searchAccessibleContents(
            @Param("keyword") String keyword,
            @Param("contentType") ContentType contentType,
            @Param("status") ContentStatus status,
            @Param("genreId") Long genreId,
            @Param("currentUserId") Long currentUserId,
            Pageable pageable
    );
}

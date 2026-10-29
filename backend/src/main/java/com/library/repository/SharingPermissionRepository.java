package com.library.repository;

import com.library.entity.SharingPermission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SharingPermissionRepository extends JpaRepository<SharingPermission, Long> {

    List<SharingPermission> findByUserLibraryIdAndIsActiveTrue(Long userLibraryId);

    @Query("SELECT CASE WHEN COUNT(sp) > 0 THEN true ELSE false END " +
            "FROM SharingPermission sp " +
            "WHERE sp.userLibrary.content.id = :contentId " +
            "AND sp.isActive = true " +
            "AND (sp.shareScope = 'ALL_USERS' OR sp.sharedWithUser.id = :viewerUserId)")
    boolean hasActiveShareAccess(@Param("contentId") Long contentId, @Param("viewerUserId") Long viewerUserId);
}

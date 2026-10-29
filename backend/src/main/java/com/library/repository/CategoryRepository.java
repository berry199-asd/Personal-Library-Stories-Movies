package com.library.repository;

import com.library.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query("SELECT c FROM Category c WHERE c.isSystemDefault = true OR c.user.id = :userId ORDER BY c.isSystemDefault DESC, c.name ASC")
    List<Category> findAllAvailableForUser(@Param("userId") Long userId);

    List<Category> findByUserIdOrderByNameAsc(Long userId);
}

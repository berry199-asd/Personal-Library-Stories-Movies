package com.library.repository;

import com.library.entity.ContentLink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContentLinkRepository extends JpaRepository<ContentLink, Long> {
    List<ContentLink> findByContentIdOrderByCreatedAtAsc(Long contentId);
}

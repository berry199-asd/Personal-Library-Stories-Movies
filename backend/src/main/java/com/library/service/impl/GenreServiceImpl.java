package com.library.service.impl;

import com.library.dto.request.GenreRequest;
import com.library.dto.response.GenreResponse;
import com.library.entity.Genre;
import com.library.exception.BadRequestException;
import com.library.exception.ResourceNotFoundException;
import com.library.repository.GenreRepository;
import com.library.service.GenreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.Normalizer;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class GenreServiceImpl implements GenreService {

    private final GenreRepository genreRepository;
    private final JdbcTemplate jdbcTemplate;

    @Override
    @Transactional(readOnly = true)
    public List<GenreResponse> getAllGenres() {
        return genreRepository.findAll(Sort.by(Sort.Direction.ASC, "name"))
                .stream()
                .map(g -> {
                    GenreResponse res = GenreResponse.fromEntity(g);
                    res.setContentCount(getContentCountByGenre(g.getId()));
                    return res;
                })
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public int getContentCountByGenre(Long genreId) {
        try {
            Integer count = jdbcTemplate.queryForObject(
                    "SELECT COUNT(*) FROM content_genres WHERE genre_id = ?",
                    Integer.class,
                    genreId
            );
            return count != null ? count : 0;
        } catch (Exception e) {
            return 0;
        }
    }

    @Override
    @Transactional
    public GenreResponse createGenre(GenreRequest request) {
        if (genreRepository.existsByNameIgnoreCase(request.getName().trim())) {
            throw new BadRequestException("Thể loại '" + request.getName() + "' đã tồn tại");
        }
        String slug = (request.getSlug() != null && !request.getSlug().isBlank())
                ? request.getSlug().trim().toLowerCase(Locale.ROOT)
                : toSlug(request.getName());
        if (genreRepository.existsBySlug(slug)) {
            slug = slug + "-" + System.currentTimeMillis();
        }

        String type = (request.getApplicableType() != null && !request.getApplicableType().isBlank())
                ? request.getApplicableType().trim().toUpperCase()
                : "BOTH";
        String packedDesc = "[Type:" + type + "] " + (request.getDescription() != null ? request.getDescription().trim() : "");

        Genre genre = Genre.builder()
                .name(request.getName().trim())
                .slug(slug)
                .description(packedDesc)
                .build();
        Genre saved = genreRepository.save(genre);
        log.info("Created new genre: {} (slug: {}, applicableType: {})", saved.getName(), saved.getSlug(), type);
        GenreResponse response = GenreResponse.fromEntity(saved);
        response.setContentCount(0);
        return response;
    }

    @Override
    @Transactional
    public GenreResponse updateGenre(Long id, GenreRequest request) {
        Genre genre = genreRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy thể loại #" + id));

        String trimmedName = request.getName().trim();
        if (!genre.getName().equalsIgnoreCase(trimmedName) && genreRepository.existsByNameIgnoreCase(trimmedName)) {
            throw new BadRequestException("Thể loại '" + trimmedName + "' đã tồn tại");
        }
        genre.setName(trimmedName);

        if (request.getSlug() != null && !request.getSlug().isBlank()) {
            genre.setSlug(request.getSlug().trim().toLowerCase(Locale.ROOT));
        }

        String type = (request.getApplicableType() != null && !request.getApplicableType().isBlank())
                ? request.getApplicableType().trim().toUpperCase()
                : "BOTH";
        String packedDesc = "[Type:" + type + "] " + (request.getDescription() != null ? request.getDescription().trim() : "");
        genre.setDescription(packedDesc);

        Genre saved = genreRepository.save(genre);
        log.info("Updated genre #{}: {} (applicableType: {})", id, saved.getName(), type);
        GenreResponse response = GenreResponse.fromEntity(saved);
        response.setContentCount(getContentCountByGenre(id));
        return response;
    }

    @Override
    @Transactional
    public void deleteGenre(Long id) {
        Genre genre = genreRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy thể loại #" + id));

        int affectedCount = getContentCountByGenre(id);
        try {
            jdbcTemplate.update("DELETE FROM content_genres WHERE genre_id = ?", id);
            log.info("Safely unbound {} content relationships for genre #{}", affectedCount, id);
        } catch (Exception e) {
            log.warn("Notice deleting content_genres for genre #{}: {}", id, e.getMessage());
        }

        genreRepository.delete(genre);
        log.info("Deleted genre #{}: {}", id, genre.getName());
    }

    private String toSlug(String input) {
        String normalized = Normalizer.normalize(input, Normalizer.Form.NFD)
                .replaceAll("\\p{InCombiningDiacriticalMarks}+", "")
                .replace('đ', 'd')
                .replace('Đ', 'D');
        return normalized.toLowerCase(Locale.ROOT)
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("(^-|-$)", "");
    }
}

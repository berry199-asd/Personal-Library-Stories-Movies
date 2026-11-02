package com.library.service.impl;

import com.library.dto.request.GenreRequest;
import com.library.dto.response.GenreResponse;
import com.library.entity.Genre;
import com.library.exception.BadRequestException;
import com.library.exception.ResourceNotFoundException;
import com.library.repository.GenreRepository;
import com.library.service.GenreService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.Normalizer;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GenreServiceImpl implements GenreService {

    private final GenreRepository genreRepository;

    @Override
    @Transactional(readOnly = true)
    public List<GenreResponse> getAllGenres() {
        return genreRepository.findAll(Sort.by(Sort.Direction.ASC, "name"))
                .stream()
                .map(GenreResponse::fromEntity)
                .collect(Collectors.toList());
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
        Genre genre = Genre.builder()
                .name(request.getName().trim())
                .slug(slug)
                .description(request.getDescription())
                .build();
        return GenreResponse.fromEntity(genreRepository.save(genre));
    }

    @Override
    @Transactional
    public GenreResponse updateGenre(Long id, GenreRequest request) {
        Genre genre = genreRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy thể loại #" + id));
        genre.setName(request.getName().trim());
        if (request.getSlug() != null && !request.getSlug().isBlank()) {
            genre.setSlug(request.getSlug().trim().toLowerCase(Locale.ROOT));
        }
        genre.setDescription(request.getDescription());
        return GenreResponse.fromEntity(genreRepository.save(genre));
    }

    @Override
    @Transactional
    public void deleteGenre(Long id) {
        Genre genre = genreRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy thể loại #" + id));
        genreRepository.delete(genre);
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

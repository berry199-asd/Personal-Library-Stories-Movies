package com.library.service;

import com.library.dto.request.GenreRequest;
import com.library.dto.response.GenreResponse;

import java.util.List;

public interface GenreService {
    List<GenreResponse> getAllGenres();
    GenreResponse createGenre(GenreRequest request);
    GenreResponse updateGenre(Long id, GenreRequest request);
    void deleteGenre(Long id);
}

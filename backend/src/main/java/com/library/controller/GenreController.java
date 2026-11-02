package com.library.controller;

import com.library.dto.request.GenreRequest;
import com.library.dto.response.ApiResponse;
import com.library.dto.response.GenreResponse;
import com.library.service.GenreService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class GenreController {

    private final GenreService genreService;

    @GetMapping("/api/genres")
    public ResponseEntity<ApiResponse<List<GenreResponse>>> getAllGenres() {
        return ResponseEntity.ok(ApiResponse.ok("Lấy danh sách thể loại thành công", genreService.getAllGenres()));
    }

    @PostMapping("/api/admin/genres")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<GenreResponse>> createGenre(@Valid @RequestBody GenreRequest request) {
        GenreResponse created = genreService.createGenre(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Thêm thể loại mới thành công", created));
    }

    @PutMapping("/api/admin/genres/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<GenreResponse>> updateGenre(
            @PathVariable Long id,
            @Valid @RequestBody GenreRequest request
    ) {
        return ResponseEntity.ok(ApiResponse.ok("Cập nhật thể loại thành công", genreService.updateGenre(id, request)));
    }

    @DeleteMapping("/api/admin/genres/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteGenre(@PathVariable Long id) {
        genreService.deleteGenre(id);
        return ResponseEntity.ok(ApiResponse.ok("Xóa thể loại thành công", null));
    }
}

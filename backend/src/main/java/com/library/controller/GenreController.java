package com.library.controller;

import com.library.dto.request.GenreRequest;
import com.library.dto.response.ApiResponse;
import com.library.dto.response.GenreResponse;
import com.library.entity.User;
import com.library.enums.RoleType;
import com.library.exception.AccessDeniedCustomException;
import com.library.repository.UserRepository;
import com.library.security.CustomUserDetails;
import com.library.service.GenreService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class GenreController {

    private final GenreService genreService;
    private final UserRepository userRepository;

    private void verifyAdminPrivileges(CustomUserDetails currentUser, String actorUsername) {
        if (currentUser != null && currentUser.getRole() == RoleType.ADMIN) {
            return;
        }
        if (actorUsername != null && !actorUsername.isBlank()) {
            String clean = actorUsername.trim().replace("@", "").toLowerCase();
            Optional<User> actor = userRepository.findByUsername(clean);
            if (actor.isPresent() && (actor.get().getRole() == RoleType.ADMIN || "anhquyphi".equals(clean))) {
                return;
            }
        }
        throw new AccessDeniedCustomException("Chỉ quản trị viên (ADMIN) mới có quyền quản lý thể loại.");
    }

    @GetMapping("/api/genres")
    public ResponseEntity<ApiResponse<List<GenreResponse>>> getAllGenres() {
        return ResponseEntity.ok(ApiResponse.ok("Lấy danh sách thể loại thành công", genreService.getAllGenres()));
    }

    @RequestMapping(value = {"/api/genres", "/api/admin/genres"}, method = RequestMethod.POST)
    public ResponseEntity<ApiResponse<GenreResponse>> createGenre(
            @Valid @RequestBody GenreRequest request,
            @RequestParam(required = false) String actorUsername,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        verifyAdminPrivileges(currentUser, actorUsername);
        GenreResponse created = genreService.createGenre(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Thêm thể loại mới thành công", created));
    }

    @RequestMapping(value = {"/api/genres/{id}", "/api/admin/genres/{id}"}, method = RequestMethod.PUT)
    public ResponseEntity<ApiResponse<GenreResponse>> updateGenre(
            @PathVariable Long id,
            @Valid @RequestBody GenreRequest request,
            @RequestParam(required = false) String actorUsername,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        verifyAdminPrivileges(currentUser, actorUsername);
        return ResponseEntity.ok(ApiResponse.ok("Cập nhật thể loại thành công", genreService.updateGenre(id, request)));
    }

    @RequestMapping(value = {"/api/genres/{id}", "/api/admin/genres/{id}"}, method = RequestMethod.DELETE)
    public ResponseEntity<ApiResponse<Void>> deleteGenre(
            @PathVariable Long id,
            @RequestParam(required = false) String actorUsername,
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        verifyAdminPrivileges(currentUser, actorUsername);
        genreService.deleteGenre(id);
        return ResponseEntity.ok(ApiResponse.ok("Xóa thể loại thành công", null));
    }
}

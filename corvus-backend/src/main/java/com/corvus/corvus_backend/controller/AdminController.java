package com.corvus.corvus_backend.controller;

import com.corvus.corvus_backend.dto.AdminDtoRequest;
import com.corvus.corvus_backend.dto.AdminDtoResponse;
import com.corvus.corvus_backend.dto.LoginAdminDtoRequest;
import com.corvus.corvus_backend.dto.LoginAdminDtoResponse;
import com.corvus.corvus_backend.dto.ApiResponse;
import com.corvus.corvus_backend.service.AdminService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admins")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/login")
    public ApiResponse<LoginAdminDtoResponse> login(@Valid @RequestBody LoginAdminDtoRequest request) {
        return ApiResponse.ok("Sesión iniciada correctamente", adminService.login(request));
    }

    // Jwt = el token ya validado; 
    // "sub" es id del admin
    @GetMapping("/me")
    public ApiResponse<AdminDtoResponse> me(@AuthenticationPrincipal Jwt jwt) {
        return ApiResponse.ok(adminService.getProfile(Long.valueOf(jwt.getSubject())));
    }

    @GetMapping
    public ApiResponse<List<AdminDtoResponse>> findAll() {
        return ApiResponse.ok(adminService.findAll());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<AdminDtoResponse> create(@Valid @RequestBody AdminDtoRequest request) {
        return ApiResponse.ok("Administrador creado correctamente", adminService.create(request));
    }
}

package com.corvus.corvus_backend.service;

import com.corvus.corvus_backend.dto.AdminDtoRequest;
import com.corvus.corvus_backend.dto.AdminDtoResponse;
import com.corvus.corvus_backend.dto.LoginAdminDtoRequest;
import com.corvus.corvus_backend.dto.LoginAdminDtoResponse;
import com.corvus.corvus_backend.model.Admin;
import com.corvus.corvus_backend.repository.AdminRepository;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AdminService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtEncoder jwtEncoder;
    private final long expiresInMinutes;

    // Tu DUMMY_HASH: se compara contra él cuando el correo no existe, para que el login
    // tarde igual y no revele qué correos están registrados
    private final String dummyHash;

    public AdminService(AdminRepository adminRepository, PasswordEncoder passwordEncoder,
                        JwtEncoder jwtEncoder,
                        @Value("${app.jwt.expires-in-minutes}") long expiresInMinutes) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtEncoder = jwtEncoder;
        this.expiresInMinutes = expiresInMinutes;
        this.dummyHash = passwordEncoder.encode("contraseña-de-relleno");
    }

    public LoginAdminDtoResponse login(LoginAdminDtoRequest request) {
        Admin admin = adminRepository.findByEmail(normalize(request.email())).orElse(null);

        boolean validPassword = passwordEncoder.matches(request.password(),
                admin != null ? admin.getPasswordHash() : dummyHash);

        if (admin == null || !validPassword) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Correo o contraseña incorrectos");
        }

        return new LoginAdminDtoResponse(generateToken(admin), toResponse(admin));
    }

    // Admin logueado
    @Transactional(readOnly = true)
    public AdminDtoResponse getProfile(Long id) {
        return toResponse(adminRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Administrador no encontrado")));
    }

    // lista de admins
    @Transactional(readOnly = true)
    public List<AdminDtoResponse> findAll() {
        return adminRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"))
                .stream().map(this::toResponse).toList();
    }

    @Transactional
    public AdminDtoResponse create(AdminDtoRequest request) {
        String email = normalize(request.email());

        if (adminRepository.existsByEmail(email)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "Ya existe un administrador con ese correo");
        }

        Admin admin = new Admin(email, passwordEncoder.encode(request.password()));
        return toResponse(adminRepository.save(admin));
    }

    private String generateToken(Admin admin) {
        Instant now = Instant.now();

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .subject(String.valueOf(admin.getId()))
                .claim("email", admin.getEmail())
                .issuedAt(now)
                .expiresAt(now.plus(expiresInMinutes, ChronoUnit.MINUTES))
                .build();

        JwsHeader header = JwsHeader.with(MacAlgorithm.HS256).build();
        return jwtEncoder.encode(JwtEncoderParameters.from(header, claims)).getTokenValue();
    }

    private String normalize(String email) {
        return email.trim().toLowerCase();
    }

    private AdminDtoResponse toResponse(Admin admin) {
        return new AdminDtoResponse(admin.getId(), admin.getEmail(), admin.getCreatedAt());
    }
}

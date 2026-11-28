package com.corvus.corvus_backend.config;

import com.corvus.corvus_backend.model.Admin;
import com.corvus.corvus_backend.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/** Se ejecuta una vez al arrancar la app. */
@Component
public class AdminSeeder implements CommandLineRunner {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final String email;
    private final String password;

    public AdminSeeder(AdminRepository adminRepository, PasswordEncoder passwordEncoder,
                       @Value("${app.seed.admin-email}") String email,
                       @Value("${app.seed.admin-password}") String password) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
        this.email = email;
        this.password = password;
    }

    @Override
    public void run(String... args) {
        if (adminRepository.count() > 0 || email.isBlank() || password.isBlank()) {
            return;
        }
        adminRepository.save(new Admin(email.trim().toLowerCase(), passwordEncoder.encode(password)));
    }
}

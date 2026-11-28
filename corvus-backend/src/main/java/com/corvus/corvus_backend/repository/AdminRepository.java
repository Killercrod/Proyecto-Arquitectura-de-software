package com.corvus.corvus_backend.repository;

import com.corvus.corvus_backend.model.Admin;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
/**
 * Acceso a la bd: AdminRepository
 * JPA ya incluye: findAll(), findById(id), save(obj), deleteById(id)
 */

@Repository 
public interface AdminRepository extends JpaRepository<Admin, Long> {
    
    Optional<Admin> findByEmail(String email);
    boolean existsByEmail(String email);
}

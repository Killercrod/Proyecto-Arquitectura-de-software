package com.corvus.corvus_backend.repository;

import com.corvus.corvus_backend.model.Category;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * acceso a la BD.
 * JPA ya incluye: findAll(), findById(id), save(obj), deleteById(id)
 */

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    // 
    interface CategoryWithCount {
        Long getId();
        String getName();
        Long getProductCount();
    }

    //
    @Query("""
            SELECT c.id AS id, c.name AS name, COUNT(p.id) AS productCount
            FROM Category c
            LEFT JOIN Product p ON p.category = c AND p.active = true
            GROUP BY c.id, c.name
            ORDER BY c.name ASC
            """)
    List<CategoryWithCount> findAllWithProductCount();

    @Query("""
            SELECT c.id AS id, c.name AS name, COUNT(p.id) AS productCount
            FROM Category c
            LEFT JOIN Product p ON p.category = c AND p.active = true
            WHERE c.id = :id
            GROUP BY c.id, c.name
            """)
    Optional<CategoryWithCount> findByIdWithProductCount(@Param("id") Long id);

    boolean existsByNameIgnoreCase(String name);

    boolean existsByNameIgnoreCaseAndIdNot(String name, Long id);
}
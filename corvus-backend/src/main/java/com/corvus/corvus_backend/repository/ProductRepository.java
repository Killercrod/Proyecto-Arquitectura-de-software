package com.corvus.corvus_backend.repository;

import com.corvus.corvus_backend.model.Product;

import com.corvus.corvus_backend.model.Product;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository 
public interface ProductRepository extends JpaRepository<Product, Long>{
    // meetodos

    // categoryExist(){} -> implementado por jpa en CategoryRepository
    // findAll(){} implementado ya por JPA

    // findById(){} implementado por JPA
    // attachImages(products){}

    // create() implementado por JPA
    // update(Long id, data, imageUrls){}
    
    // insertImages(){}

    @EntityGraph(attributePaths = "category")
    @Query("""
            SELECT p FROM Product p
            WHERE p.active = true
              AND (:categoryId IS NULL OR p.category.id = :categoryId)
              AND LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%'))
            """)
    Page<Product> search(@Param("categoryId") Long categoryId,
                         @Param("search") String search,
                         Pageable pageable);

    boolean existsByCategoryId(Long categoryId);

    // findById de Node (solo activos)
    @EntityGraph(attributePaths = "category")
    Optional<Product> findByIdAndActiveTrue(Long id);
}

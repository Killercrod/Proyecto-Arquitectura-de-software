package com.corvus.corvus_backend.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

// objeto Producto para la bd
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String name;

    // TEXT permite descripciones largas (VARCHAR se queda corto)
    @Column(columnDefinition = "TEXT")
    private String description;

    // DECIMAL(10,2): hasta 10 dígitos, 2 decimales. Ej: 120.00
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(nullable = false)
    private int stock;

    // El atributo se llama "active", pero la columna se llama "is_active"
    @Column(name = "is_active", nullable = false)
    private boolean active;


    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    /**
     * @OrderBy: siempre vienen ordenadas por "position".
     */
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("position ASC")
    private List<ProductImage> images = new ArrayList<>();

    // updatable = false: una vez creado, este valor ya no cambia
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Se ejecuta justo antes del INSERT
    @PrePersist
    void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    // Se ejecuta justo antes de cada UPDATE
    @PreUpdate
    void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // JPA constructor
    protected Product() {
    }

    public Product(String name, String description, BigDecimal price,
                   int stock, boolean active, Category category) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.active = active;
        this.category = category;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public BigDecimal getPrice() { return price; }
    public int getStock() { return stock; }
    public boolean isActive() { return active; }
    public Category getCategory() { return category; }
    public List<ProductImage> getImages() { return images; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }

    // Setters: solo de lo que se puede editar (id y fechas no)
    public void setName(String name) { this.name = name; }
    public void setDescription(String description) { this.description = description; }
    public void setPrice(BigDecimal price) { this.price = price; }
    public void setStock(int stock) { this.stock = stock; }
    public void setActive(boolean active) { this.active = active; }
    public void setCategory(Category category) { this.category = category; }

    public void addProductImage(ProductImage productImage){
        images.add(productImage);
        productImage.setProduct(this);
        
    }
}
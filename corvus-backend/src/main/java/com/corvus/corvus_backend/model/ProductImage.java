package com.corvus.corvus_backend.model;

import java.math.BigInteger;

import jakarta.annotation.Generated;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity 
@Table (name="product_images")
public class ProductImage {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn (name="product_id", nullable=false)
    private Product product;

    @Column(name="position", nullable = false)
    private int position;

    @Column(name="image_url", nullable = false, length = 500)
    private String imageUrl;

    // construtor
    protected ProductImage(){}
    public ProductImage(Product product, int position, String imageUrl){
        this.product = product;
        this.position = position;
        this.imageUrl = imageUrl;
    }

    // metodos

    // setters
    public void setProduct(Product producto){
        this.product =producto;
    }
    // getters
    public Long getId() { return id; }
    public Product getProduct() { return product; }
    public int getPosition() { return position; }
    public String getImageUrl() { return imageUrl; }
}

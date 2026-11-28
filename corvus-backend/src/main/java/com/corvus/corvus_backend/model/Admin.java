package com.corvus.corvus_backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

import org.springframework.cglib.core.Local;

// objeto Admin para el paso antes de ir a la bd
@Entity 
@Table (name="administrators")
public class Admin {
    // atributos
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // @Column(name = "id")
    private Long id;
    
    @Column (name="password_hash", nullable = false, length = 255)
    private String passwordHash;

    @Column (name = "email", nullable = false, length = 100, unique = true)
    private String email;

    // se crea en automatico
    @Column (name="created_at", nullable = true, updatable = false)
    private LocalDateTime createdAt;

    // constructor JPA
    protected Admin(){}

    // constructor
    public Admin( String email, String passwordHash){
        this.email = email;
        this.passwordHash = passwordHash;
    }

    // metodos
    // fecha de creacion de admin antes de guardar en bd
    @PrePersist 
    public void createAt(){
        this.createdAt = LocalDateTime.now();
    }

    // setters
    // public void setEmail(String email){
    //     this.email = email;
    // }

    // public void setPasswordHash(String passwordHash) {
    //     this.passwordHash = passwordHash; 
    // }

    // getters
    public Long getId(){return id;}
    public String getPasswordHash(){return passwordHash;}
    public String getEmail(){return email;}
    public LocalDateTime getCreatedAt(){return createdAt;}

}

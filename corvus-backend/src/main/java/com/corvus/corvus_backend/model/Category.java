package com.corvus.corvus_backend.model;

// imports
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "categories")
public class Category {
    // contructor JPA (Java Persistence API)
    protected  Category(){}

    // tabla bd
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100, unique = true) // NOT NULL, VARCHAR(100), sin repetidos
    private String name;
    // protected Category(){}

     public Category(String name) {
        this.name = name;
    }


    // methods
    public void setName(String name) {
        this.name = name;
    }
    public Long getId(){
        return id;
    }

    public String getName(){
        return name;
    }


}

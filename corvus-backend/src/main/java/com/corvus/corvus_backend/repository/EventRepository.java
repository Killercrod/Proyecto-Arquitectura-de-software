package com.corvus.corvus_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.corvus.corvus_backend.model.Event;

@Repository 
public interface EventRepository extends JpaRepository<Event, Long>{
    
    
}

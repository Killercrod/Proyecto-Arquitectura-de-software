package com.corvus.corvus_backend.model;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity 
@Table (name = "events")
public class Event {
    // atributos
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="title",nullable = false, length = 150)
    private String title;

    @Column(name ="start_time", nullable = false)
    private LocalTime startTime;

    @Column(name="place", nullable = false, length = 200)
    private String place;

    @Column(name="end_time", nullable = false)
    private LocalTime endTime;

    @Column(name ="event_date",nullable = false)
    private LocalDate eventDate;

    // constructor JPA
    protected Event(){}

    public Event(String title, LocalTime starTime, String place,
        LocalDate evenDate, LocalTime endTime){
        this.title= title;
        this.startTime = starTime;
        this.place= place;
        this.eventDate = evenDate;
        this.endTime = endTime;
    }

    // metodos

    //setters
    public void setTitle(String title) { this.title = title; }
    public void setEventDate(LocalDate eventDate) { this.eventDate = eventDate; }
    public void setStartTime(LocalTime startTime) { this.startTime = startTime; }
    public void setEndTime(LocalTime endTime) { this.endTime = endTime; }
    public void setPlace(String place) { this.place = place; }   

    //getters
    public Long getId() { return id; }
    public String getTitle() { return title; }
    public LocalDate getEventDate() { return eventDate; }
    public LocalTime getStartTime() { return startTime; }
    public LocalTime getEndTime() { return endTime; }
    public String getPlace() { return place; }
    
}

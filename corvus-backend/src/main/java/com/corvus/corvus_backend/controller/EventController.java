package com.corvus.corvus_backend.controller;

import com.corvus.corvus_backend.dto.ApiResponse;
import com.corvus.corvus_backend.dto.EventDtoRequest;
import com.corvus.corvus_backend.dto.EventDtoResponse;
// import com.corvus.corvus_backend.dto.EventUpdateDtoRequest;
import com.corvus.corvus_backend.service.EventService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public ApiResponse<List<EventDtoResponse>> findAll() {
        return ApiResponse.ok(eventService.findAll());
    }

    @GetMapping("/{id}")
    public ApiResponse<EventDtoResponse> findById(@PathVariable Long id) {
        return ApiResponse.ok(eventService.findById(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<EventDtoResponse> create(@Valid @RequestBody EventDtoRequest request) {
        return ApiResponse.ok("Evento creado correctamente", eventService.create(request));
    }

    // edicion de eventos opcional
    // implementaci{on futura}
    // @RequestMapping(value = "/{id}", method = {RequestMethod.PUT, RequestMethod.PATCH})
    // public ApiResponse<EventDtoResponse> update(@PathVariable Long id,
    //                                             @Valid @RequestBody EventUpdateDtoRequest request) {
    //     return ApiResponse.ok("Evento actualizado correctamente", eventService.update(id, request));
    // }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        eventService.delete(id);
        return ApiResponse.message("Evento eliminado correctamente");
    }
}

package com.corvus.corvus_backend.service;

import com.corvus.corvus_backend.dto.EventDtoRequest;
import com.corvus.corvus_backend.dto.EventDtoResponse;
// import com.corvus.corvus_backend.dto.EventUpdateDtoRequest;
import com.corvus.corvus_backend.model.Event;
import com.corvus.corvus_backend.repository.EventRepository;
import java.time.LocalTime;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class EventService {

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    // ORDER BY event_date ASC, start_time ASC
    @Transactional(readOnly = true)
    public List<EventDtoResponse> findAll() {
        return eventRepository.findAll(Sort.by("eventDate", "startTime"))
                .stream().map(this::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public EventDtoResponse findById(Long id) {
        return toResponse(getOrThrow(id));
    }

    @Transactional
    public EventDtoResponse create(EventDtoRequest request) {
        validateTimes(request.startTime(), request.endTime());

        Event event = new Event(request.title().trim(), request.startTime(), 
                    request.location().trim(), request.date(), request.endTime());

        return toResponse(eventRepository.save(event));
    }

    // @Transactional
    // implementacion futura
    // public EventDtoResponse update(Long id, EventUpdateDtoRequest request) {}

    @Transactional
    public void delete(Long id) {
        eventRepository.delete(getOrThrow(id));
    }

    private Event getOrThrow(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Evento no encontrado"));
    }

    private void validateTimes(LocalTime start, LocalTime end) {
        if (!end.isAfter(start)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "La hora de finalización debe ser posterior a la de inicio");
        }
    }

    private EventDtoResponse toResponse(Event event) {
        return new EventDtoResponse(event.getId(), event.getTitle(), event.getPlace(),
                event.getEventDate(), event.getStartTime(), event.getEndTime());
    }
}

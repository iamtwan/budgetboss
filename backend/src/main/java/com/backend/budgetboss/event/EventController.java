package com.backend.budgetboss.event;

import com.backend.budgetboss.user.CurrentUser;
import com.backend.budgetboss.user.User;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/api/events")
@Tag(name = "Server Sent Events")
public class EventController {

  private final Logger logger = LoggerFactory.getLogger(EventController.class);
  private final EventService eventService;

  public EventController(EventService eventService) {
    this.eventService = eventService;
  }

  @GetMapping(produces = MediaType.TEXT_EVENT_STREAM_VALUE)
  public SseEmitter subscribeToEvents(@CurrentUser User user) {
    logger.info("/api/events GET request received");
    SseEmitter emitter = eventService.subscribe(user);
    logger.info("/api/events subscribed user: {}", user.getEmail());
    return emitter;
  }
}

package com.backend.budgetboss.event;

import com.backend.budgetboss.user.User;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter.SseEventBuilder;

@Service
public class EventServiceImpl implements EventService {
  private final Map<Long, SseEmitter> emitters = new ConcurrentHashMap<>();

  public SseEmitter subscribe(User user) {
    SseEmitter emitter = new SseEmitter(0L);
    emitters.put(user.getId(), emitter);

    emitter.onCompletion(() -> emitters.remove(user.getId()));
    emitter.onTimeout(emitter::complete);
    emitter.onError(emitter::completeWithError);

    return emitter;
  }

  public void sendEvent(Long id, String eventData) {
    SseEmitter emitter = emitters.get(id);

    if (emitter != null) {
      try {
        emitter.send(eventData);
      } catch (Exception e) {
        emitter.completeWithError(e);
        emitters.remove(id);
      }
    }
  }
}

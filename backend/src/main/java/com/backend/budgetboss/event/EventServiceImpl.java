package com.backend.budgetboss.event;

import com.backend.budgetboss.item.Item;
import com.backend.budgetboss.user.User;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

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

  public void sendEvent(Item item, String eventType) {
    sendEvent(item, eventType, "");
  }

  public void sendEvent(Item item, String eventType, String message) {
    long id = item.getUser().getId();
    SseEmitter emitter = emitters.get(id);

    Event event = new Event();
    event.setItemId(item.getId());
    event.setType(eventType);
    event.setMessage(message);

    if (emitter != null) {
      try {
        emitter.send(event);
      } catch (Exception e) {
        emitter.completeWithError(e);
        emitters.remove(id);
      }
    }
  }
}

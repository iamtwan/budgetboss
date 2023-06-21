package com.backend.budgetboss.event;

import com.backend.budgetboss.user.User;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface EventService {

  SseEmitter subscribe(User user);

  void sendEvent(Long id, String eventData);
}

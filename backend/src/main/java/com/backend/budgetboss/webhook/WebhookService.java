package com.backend.budgetboss.webhook;

import com.backend.budgetboss.user.User;
import java.io.IOException;
import java.util.Map;

public interface WebhookService {

  void fireItemWebhook(User user, Long id) throws IOException;

  void resetLoginWebhook(User user, Long id) throws IOException;

  void handleItemWebhook(Map<String, Object> event);

  void handleTransactionsWebhook(Map<String, Object> event) throws IOException;
}

package com.backend.budgetboss.webhook;

import java.io.IOException;
import java.util.Map;

public interface WebhookService {

  void fireItemWebhook(Long id) throws IOException;

  void resetLoginWebhook(Long id) throws IOException;

  void handleItemWebhook(Map<String, Object> event);

  void handleTransactionsWebhook(Map<String, Object> event) throws IOException;
}

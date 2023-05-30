package com.backend.budgetboss.webhook;

import java.io.IOException;
import java.util.Map;

public interface WebhookService {
    void fireItemWebhook(Long id) throws IOException;

    void handleTransactionsWebhook(Map<String, String> event);

    void handleItemWebhook(Map<String, String> event);
}

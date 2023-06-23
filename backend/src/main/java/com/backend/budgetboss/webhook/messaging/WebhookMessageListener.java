package com.backend.budgetboss.webhook.messaging;

import com.backend.budgetboss.webhook.WebhookService;
import com.backend.budgetboss.webhook.exception.InvalidWebhookRequestException;
import java.io.IOException;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class WebhookMessageListener {

  private final Logger logger = LoggerFactory.getLogger(WebhookMessageListener.class);
  private final WebhookService webhookService;

  public WebhookMessageListener(WebhookService webhookService) {
    this.webhookService = webhookService;
  }

  @RabbitListener(queues = "webhook-queue")
  public void handleWebhooks(Map<String, Object> event) throws IOException {
    switch ((String) event.get("webhook_type")) {
      case "ITEM" -> webhookService.handleItemWebhook(event);
      case "TRANSACTIONS" -> webhookService.handleTransactionsWebhook(event);
      default -> {
        logger.error("/api/webhooks received webhook event with unknown webhook_type: {}",
            event.get("webhook_type"));
        throw new InvalidWebhookRequestException(
            "Received webhook event with unknown webhook_type: " + event.get("webhook_type"));
      }
    }
  }
}

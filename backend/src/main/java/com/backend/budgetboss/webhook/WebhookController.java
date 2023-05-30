package com.backend.budgetboss.webhook;

import com.backend.budgetboss.webhook.dto.WebhookTypeDTO;
import com.backend.budgetboss.webhook.exception.InvalidWebhookRequestException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/webhooks")
@Tag(name = "Webhooks")
public class WebhookController {
    private final Logger logger = LoggerFactory.getLogger(WebhookController.class);
    private final WebhookService webhookService;

    public WebhookController(WebhookService webhookService) {
        this.webhookService = webhookService;
    }

    @PostMapping
    @Operation(summary = "Plaid Webhook", description = "Webhook listener for Plaid")
    public void handlePlaidWebhook(@RequestBody Map<String, String> event) {
        logger.info("/api/webhooks POST request received");

        if (!event.containsKey("webhook_type")) {
            logger.error("/api/webhooks received webhook event with no webhook_type");
            throw new InvalidWebhookRequestException("Received webhook event with no webhook_type");
        }

        switch (event.get("webhook_type")) {
            case "ITEM" -> webhookService.handleItemWebhook(event);
            case "TRANSACTIONS" -> webhookService.handleTransactionsWebhook(event);
            default -> {
                logger.error("/api/webhooks received webhook event with unknown webhook_type: {}", event.get("webhook_type"));
                throw new InvalidWebhookRequestException("Received webhook event with unknown webhook_type: " + event.get("webhook_type"));
            }
        }
    }

    @GetMapping("/item/{id}")
    @Operation(summary = "Fire a webhook event for the given Item", description = "Fire a webhook event for the given Item")
    public void fireItemWebhook(@PathVariable Long id) throws IOException {
        logger.info("/api/webhooks/item/{} GET request received", id);
        webhookService.fireItemWebhook(id);
        logger.info("/api/webhooks/item/{} fired webhook event for the given item", id);
    }
}

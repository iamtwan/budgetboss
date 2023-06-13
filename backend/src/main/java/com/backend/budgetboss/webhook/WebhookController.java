package com.backend.budgetboss.webhook;

import com.backend.budgetboss.webhook.exception.InvalidWebhookRequestException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/webhooks")
@Tag(name = "Webhooks")
public class WebhookController {
    private final Logger logger = LoggerFactory.getLogger(WebhookController.class);
    private final WebhookService webhookService;
    private final RabbitTemplate rabbitTemplate;

    public WebhookController(WebhookService webhookService, RabbitTemplate rabbitTemplate) {
        this.webhookService = webhookService;
        this.rabbitTemplate = rabbitTemplate;
    }

    @PostMapping(consumes = "application/json")
    @Operation(summary = "Plaid Webhook listener", description = "Webhook listener for Plaid")
    public void handlePlaidWebhook(@RequestBody Map<String, Object> event) {
        if (!event.containsKey("webhook_type")) {
            logger.error("/api/webhooks received webhook event with no webhook_type: {}", event);
            throw new InvalidWebhookRequestException("Received webhook event with no webhook_type");
        }

        logger.info("/api/webhooks POST request received with webhook_type: {}", event.get("webhook_type"));
        rabbitTemplate.convertAndSend("webhook-queue", event);
    }

    @GetMapping("/item/{id}/fire")
    @Operation(summary = "Fire a webhook event for the given Item", description = "Fire a webhook event for the given Item")
    public void fireItemWebhook(@PathVariable Long id) throws IOException {
        logger.info("/api/webhooks/item/{}/fire GET request received", id);
        webhookService.fireItemWebhook(id);
        logger.info("/api/webhooks/item/{}/fire fired a webhook event for the given item", id);
    }

    @GetMapping("/item/{id}/reset")
    @Operation(summary = "Reset the login state for the given Item", description = "Forces an Item into an ITEM_LOGIN_REQUIRED state in order to simulate an Item whose login is no longer valid")
    public void resetLoginWebhook(@PathVariable Long id) throws IOException {
        logger.info("/api/webhooks/item/{}/reset GET request received", id);
        webhookService.resetLoginWebhook(id);
        logger.info("/api/webhooks/item/reset/{} reset the login state for the given item", id);
    }
}

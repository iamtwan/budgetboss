package com.backend.budgetboss.webhook.exception;

public class InvalidWebhookRequestException extends RuntimeException {
        public InvalidWebhookRequestException(String message) {
            super(message);
        }
}

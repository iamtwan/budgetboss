package com.backend.budgetboss.webhook.messaging;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class WebhookConfig {

  @Bean
  public Queue webhookQueue() {
    return new Queue("webhook-queue");
  }
}

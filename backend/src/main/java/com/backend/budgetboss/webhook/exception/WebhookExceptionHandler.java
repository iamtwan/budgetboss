package com.backend.budgetboss.webhook.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class WebhookExceptionHandler {

  private final Logger logger = LoggerFactory.getLogger(WebhookExceptionHandler.class);

  @ExceptionHandler(FireWebhookException.class)
  public ProblemDetail handleFireWebhookException(FireWebhookException e) {
    logger.error(e.getMessage());

    ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST,
        e.getMessage());
    problemDetail.setTitle("Fire WebHook Exception");

    return problemDetail;
  }

  @ExceptionHandler(InvalidWebhookRequestException.class)
  public ProblemDetail handleInvalidWebhookRequestException(InvalidWebhookRequestException e) {
    logger.error(e.getMessage());

    ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST,
        e.getMessage());
    problemDetail.setTitle("Invalid WebHook Request");

    return problemDetail;
  }

  @ExceptionHandler(ResetLoginException.class)
  public ProblemDetail handleInvalidWebhookRequestException(ResetLoginException e) {
    logger.error(e.getMessage());

    ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST,
        e.getMessage());
    problemDetail.setTitle("Invalid WebHook Request");

    return problemDetail;
  }
}

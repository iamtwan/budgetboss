package com.backend.budgetboss.webhook.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class WebhookExceptionHandler {

  private final Logger logger = LoggerFactory.getLogger(WebhookExceptionHandler.class);

  @ExceptionHandler(FireWebhookException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public ProblemDetail handleFireWebhookException(FireWebhookException e) {
    logger.error(e.getMessage());

    ProblemDetail pd = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, e.getMessage());
    pd.setTitle("Fire WebHook Exception");

    return pd;
  }

  @ExceptionHandler(InvalidWebhookRequestException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public ProblemDetail handleInvalidWebhookRequestException(InvalidWebhookRequestException e) {
    logger.error(e.getMessage());

    ProblemDetail pd = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, e.getMessage());
    pd.setTitle("Invalid WebHook Request");

    return pd;
  }

  @ExceptionHandler(ResetLoginException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public ProblemDetail handleInvalidWebhookRequestException(ResetLoginException e) {
    logger.error(e.getMessage());

    ProblemDetail pd = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, e.getMessage());
    pd.setTitle("Invalid WebHook Request");

    return pd;
  }
}

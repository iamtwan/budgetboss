package com.backend.budgetboss.webhook.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ResetLoginException extends RuntimeException {

  public ResetLoginException(String message) {
    super(message);
  }
}

package com.backend.budgetboss.token.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class TokenCreationException extends RuntimeException {

  public TokenCreationException(String message) {
    super(message);
  }
}

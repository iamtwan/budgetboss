package com.backend.budgetboss.transaction.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class SyncFailedException extends RuntimeException {

  public SyncFailedException(String message) {
    super(message);
  }
}

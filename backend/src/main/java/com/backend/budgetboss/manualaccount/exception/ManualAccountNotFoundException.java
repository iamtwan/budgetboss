package com.backend.budgetboss.manualaccount.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ManualAccountNotFoundException extends RuntimeException {

  public ManualAccountNotFoundException(Long id) {
    super("Manual Account not found with id: " + id);
  }
}

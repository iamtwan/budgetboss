package com.backend.budgetboss.manualtransaction.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ManualTransactionNotFoundException extends RuntimeException {


  public ManualTransactionNotFoundException(Long id) {
    super("Could not find manual transaction with id: " + id);
  }
}

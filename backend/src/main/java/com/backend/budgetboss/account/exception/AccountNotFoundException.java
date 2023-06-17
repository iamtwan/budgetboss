package com.backend.budgetboss.account.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class AccountNotFoundException extends RuntimeException {

  public AccountNotFoundException(Long id) {
    super("Account not found with id: " + id);
  }

  public AccountNotFoundException(String accountId) {
    super("Account not found with account id: " + accountId);
  }
}

package com.backend.budgetboss.item.exception;

import org.springframework.http.HttpStatus;

public class AccountRequestException extends RuntimeException {

  private final HttpStatus status;

  public AccountRequestException(String message, int code) {
    super(message);
    this.status = HttpStatus.valueOf(code);
  }

  public HttpStatus getStatus() {
    return status;
  }
}

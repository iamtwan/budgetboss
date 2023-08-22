package com.backend.budgetboss.user.verification.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class VerificationCodeException extends RuntimeException {
  public VerificationCodeException() {
    super("Invalid or expired verification code");
  }
}

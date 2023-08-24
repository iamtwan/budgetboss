package com.backend.budgetboss.user.verification.exception;

public class VerificationTokenException extends RuntimeException {

  public VerificationTokenException() {
    super("Invalid or expired verification token");
  }

}

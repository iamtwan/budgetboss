package com.backend.budgetboss.user.verification.exception;

import com.backend.budgetboss.user.verification.VerificationToken;

public class VerificationTokenException extends RuntimeException {
  public VerificationTokenException() {
    super("Invalid or expired verification token");
  }

}

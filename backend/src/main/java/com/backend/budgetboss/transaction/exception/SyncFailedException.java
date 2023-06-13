package com.backend.budgetboss.transaction.exception;

public class SyncFailedException extends RuntimeException {

  public SyncFailedException(String message) {
    super(message);
  }
}

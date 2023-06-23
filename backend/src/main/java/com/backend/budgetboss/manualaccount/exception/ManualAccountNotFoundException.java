package com.backend.budgetboss.manualaccount.exception;

public class ManualAccountNotFoundException extends RuntimeException {
    public ManualAccountNotFoundException(String message) {
        super(message);
    }
}

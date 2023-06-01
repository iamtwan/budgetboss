package com.backend.budgetboss.manualtransaction.exception;

public class ManualTransactionNotFoundException extends RuntimeException {
    public ManualTransactionNotFoundException(String message) {
        super(message);
    }
}

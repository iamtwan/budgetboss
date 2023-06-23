package com.backend.budgetboss.account.exception;

public class AccountRequestException extends RuntimeException {
    public AccountRequestException(String message) {
        super(message);
    }
}

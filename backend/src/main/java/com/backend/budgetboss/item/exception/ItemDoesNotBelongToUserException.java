package com.backend.budgetboss.item.exception;

public class ItemDoesNotBelongToUserException extends RuntimeException {
        public ItemDoesNotBelongToUserException(String message) {
            super(message);
        }
}

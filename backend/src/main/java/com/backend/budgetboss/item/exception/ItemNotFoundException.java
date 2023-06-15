package com.backend.budgetboss.item.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ItemNotFoundException extends RuntimeException {
  public ItemNotFoundException(Long id) {
    super("Could not find item with id: " + id);
  }

  public ItemNotFoundException(String itemId) {
    super("Could not find item with itemId: " + itemId);
  }
}

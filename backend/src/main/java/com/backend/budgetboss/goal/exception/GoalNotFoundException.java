package com.backend.budgetboss.goal.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class GoalNotFoundException extends RuntimeException {
  public GoalNotFoundException(Long id) {
    super("Goal not found with id: " + id);
  }
}

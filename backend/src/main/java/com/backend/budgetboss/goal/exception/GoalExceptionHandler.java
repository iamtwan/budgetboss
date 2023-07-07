package com.backend.budgetboss.goal.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GoalExceptionHandler {

  private final Logger logger = LoggerFactory.getLogger(GoalExceptionHandler.class);

  @ExceptionHandler(GoalNotFoundException.class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  public ProblemDetail handleGoalNotFoundException(GoalNotFoundException e) {
      logger.error(e.getMessage());

      ProblemDetail pd = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getMessage());
      pd.setTitle("Goal not found");

      return pd;
  }
}

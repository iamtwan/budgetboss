package com.backend.budgetboss.manualtransaction.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ManualTransactionExceptionHandler {

  private final Logger logger = LoggerFactory.getLogger(ManualTransactionExceptionHandler.class);

  @ExceptionHandler(ManualTransactionNotFoundException.class)
  public ProblemDetail handleManualTransactionNotFoundException(
      ManualTransactionNotFoundException e) {
    logger.error(e.getMessage());

    ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND,
        e.getMessage());
    problemDetail.setTitle("Manual Transaction Not Found");

    return problemDetail;
  }

  @ExceptionHandler(ManualTransactionOwnershipException.class)
  public ProblemDetail handleManualTransactionOwnershipException(
      ManualTransactionOwnershipException e) {
    logger.error(e.getMessage());

    ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.FORBIDDEN,
        e.getMessage());
    problemDetail.setTitle("Manual Transaction Does Not Belong To User");

    return problemDetail;
  }
}


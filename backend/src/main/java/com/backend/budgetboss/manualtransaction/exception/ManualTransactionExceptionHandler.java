package com.backend.budgetboss.manualtransaction.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ManualTransactionExceptionHandler {

  private final Logger logger = LoggerFactory.getLogger(ManualTransactionExceptionHandler.class);

  @ExceptionHandler(ManualTransactionNotFoundException.class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  public ProblemDetail handleManualTransactionNotFoundException(
      ManualTransactionNotFoundException e) {
    logger.error(e.getMessage());

    ProblemDetail pd = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getMessage());
    pd.setTitle("Manual Transaction Not Found");

    return pd;
  }
}


package com.backend.budgetboss.manualaccount.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ManualAccountExceptionHandler {

  private final Logger logger = LoggerFactory.getLogger(ManualAccountExceptionHandler.class);

  @ExceptionHandler(ManualAccountNotFoundException.class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  public ProblemDetail handleManualAccountNotFoundException(ManualAccountNotFoundException e) {
    logger.error(e.getMessage());

    ProblemDetail pd = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getMessage());
    pd.setTitle("Manual Account Not Found");

    return pd;
  }
}

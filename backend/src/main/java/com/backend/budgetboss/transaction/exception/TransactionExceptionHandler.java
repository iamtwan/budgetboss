package com.backend.budgetboss.transaction.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class TransactionExceptionHandler {

  private final Logger logger = LoggerFactory.getLogger(TransactionExceptionHandler.class);

  @ExceptionHandler(SyncFailedException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public ProblemDetail handleSyncFailedException(SyncFailedException e) {
    logger.error(e.getMessage());

    ProblemDetail pd = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, e.getMessage());
    pd.setTitle("Transaction Sync Failed");

    return pd;
  }
}

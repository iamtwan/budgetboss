package com.backend.budgetboss.account.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class AccountExceptionHandler {

  private final Logger logger = LoggerFactory.getLogger(AccountExceptionHandler.class);

  @ExceptionHandler(AccountNotFoundException.class)
  public ProblemDetail handleAccountNotFoundException(AccountNotFoundException e) {
    logger.error(e.getMessage());

    ProblemDetail pd = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getMessage());
    pd.setTitle("Account Not Found");

    return pd;
  }

  @ExceptionHandler(AccountRequestException.class)
  public ProblemDetail handleAccountRequestException(AccountRequestException e) {
    logger.error(e.getMessage());

    ProblemDetail pd = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, e.getMessage());
    pd.setTitle("Account Request Exception");

    return pd;
  }

  @ExceptionHandler(AccountOwnershipException.class)
  public ProblemDetail handleAccountOwnershipException(AccountOwnershipException e) {
    logger.error(e.getMessage());

    ProblemDetail pd = ProblemDetail.forStatusAndDetail(HttpStatus.FORBIDDEN, e.getMessage());
    pd.setTitle("Account Ownership Exception");

    return pd;
  }
}

package com.backend.budgetboss.item.exception;

import com.backend.budgetboss.account.exception.AccountRequestException;
import java.io.IOException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ItemExceptionHandler {

  private final Logger logger = LoggerFactory.getLogger(ItemExceptionHandler.class);

  @ExceptionHandler(IOException.class)
  public ProblemDetail handleIOException(IOException e) {
    logger.error(e.getMessage());

    ProblemDetail pd = ProblemDetail.forStatusAndDetail(HttpStatus.INTERNAL_SERVER_ERROR,
        e.getMessage());
    pd.setTitle("IO Exception");

    return pd;
  }

  @ExceptionHandler(AccountRequestException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public ProblemDetail handleItemExceptionHandler(AccountRequestException e) {
    logger.error(e.getMessage());

    ProblemDetail pd = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, e.getMessage());
    pd.setTitle("Could Not Create Item");

    return pd;
  }

  @ExceptionHandler(ItemNotFoundException.class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  public ProblemDetail handleItemNotFoundException(ItemNotFoundException e) {
    logger.error(e.getMessage());

    ProblemDetail pd = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getMessage());
    pd.setTitle("Item Not Found");

    return pd;
  }
}

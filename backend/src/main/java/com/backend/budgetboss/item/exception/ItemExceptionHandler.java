package com.backend.budgetboss.item.exception;

import java.io.IOException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ItemExceptionHandler {

  private final Logger logger = LoggerFactory.getLogger(ItemExceptionHandler.class);

  @ExceptionHandler(IOException.class)
  public ProblemDetail handleIOException(IOException e) {
    logger.error(e.getMessage());

    ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.INTERNAL_SERVER_ERROR,
        e.getMessage());
    problemDetail.setTitle("IO Exception");

    return problemDetail;
  }

  @ExceptionHandler(AccountRequestException.class)
  public ProblemDetail handleItemExceptionHandler(AccountRequestException e) {
    logger.error(e.getMessage());

    ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(e.getStatus(), e.getMessage());
    problemDetail.setTitle("Item Exception Handler");

    return problemDetail;
  }

  @ExceptionHandler(ItemDoesNotBelongToUserException.class)
  public ProblemDetail handleItemDoesNotBelongToUserException(ItemDoesNotBelongToUserException e) {
    logger.error(e.getMessage());

    ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.FORBIDDEN,
        e.getMessage());
    problemDetail.setTitle("Item Does Not Belong To User");

    return problemDetail;
  }

  @ExceptionHandler(ItemNotFoundException.class)
  public ProblemDetail handleItemNotFoundException(ItemNotFoundException e) {
    logger.error(e.getMessage());

    ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND,
        e.getMessage());
    problemDetail.setTitle("Item Not Found");

    return problemDetail;
  }

  @ExceptionHandler(ItemOwnershipException.class)
  public ProblemDetail handleItemOwnershipException(ItemOwnershipException e) {
    logger.error(e.getMessage());

    ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.FORBIDDEN,
        e.getMessage());
    problemDetail.setTitle("Item Ownership Exception");

    return problemDetail;
  }
}

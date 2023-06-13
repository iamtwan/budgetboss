package com.backend.budgetboss.token.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class TokenExceptionHandler {

  private final Logger logger = LoggerFactory.getLogger(TokenExceptionHandler.class);

  @ExceptionHandler(TokenCreationException.class)
  public ResponseEntity<ProblemDetail> handleTokenCreationException(TokenCreationException e) {
    logger.error(e.getMessage());

    ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST,
        e.getMessage());
    problemDetail.setTitle("Token Creation Exception");

    return new ResponseEntity<>(problemDetail, HttpStatus.BAD_REQUEST);
  }
}

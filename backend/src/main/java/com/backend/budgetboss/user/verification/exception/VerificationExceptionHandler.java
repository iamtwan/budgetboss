package com.backend.budgetboss.user.verification.exception;

import com.backend.budgetboss.token.exception.TokenCreationException;
import com.backend.budgetboss.token.exception.TokenExceptionHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class VerificationExceptionHandler {

  private final Logger logger = LoggerFactory.getLogger(TokenExceptionHandler.class);

  @ExceptionHandler(VerificationCodeException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public ResponseEntity<ProblemDetail> handleTokenCreationException(TokenCreationException e) {
    logger.error(e.getMessage());

    ProblemDetail pd = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, e.getMessage());
    pd.setTitle("Verification Code Exception");

    return new ResponseEntity<>(pd, HttpStatus.BAD_REQUEST);
  }
}

package com.backend.budgetboss.manualinstitution.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ManualInstitutionHandler {

  Logger logger = LoggerFactory.getLogger(ManualInstitutionHandler.class);

  @ExceptionHandler(ManualInstitutionNotFoundException.class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  public ProblemDetail handleManualInstitutionNotFoundException(
      ManualInstitutionNotFoundException e) {
    logger.error(e.getMessage());

    ProblemDetail pd = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getMessage());
    pd.setTitle("Manual institution not found");

    return pd;
  }
}

package com.backend.budgetboss.manualinstitution.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ManualInstitutionHandler {

  Logger logger = LoggerFactory.getLogger(ManualInstitutionHandler.class);

  @ExceptionHandler(ManualInstitutionNotFoundException.class)
  public ProblemDetail handleManualInstitutionNotFoundException(
      ManualInstitutionNotFoundException e) {
    logger.error(e.getMessage());

    ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND,
        e.getMessage());
    problemDetail.setTitle("Manual institution not found");

    return problemDetail;
  }

  @ExceptionHandler(ManualInstitutionOwnershipException.class)
  public ProblemDetail handleManualInstitutionOwnershipException(
      ManualInstitutionOwnershipException e) {
    logger.error(e.getMessage());

    ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.FORBIDDEN,
        e.getMessage());
    problemDetail.setTitle("Manual institution does not belong to user");

    return problemDetail;
  }
}

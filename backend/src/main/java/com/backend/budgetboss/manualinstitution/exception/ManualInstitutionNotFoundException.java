package com.backend.budgetboss.manualinstitution.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ManualInstitutionNotFoundException extends RuntimeException {
  public ManualInstitutionNotFoundException(Long id) {
    super("Manual institution not found with id: " + id);
  }
}

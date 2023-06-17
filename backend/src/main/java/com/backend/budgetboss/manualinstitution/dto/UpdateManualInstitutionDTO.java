package com.backend.budgetboss.manualinstitution.dto;

import jakarta.validation.constraints.NotBlank;

public class UpdateManualInstitutionDTO {

  @NotBlank(message = "Institution name is required")
  private String name;

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  @Override
  public String toString() {
    return "UpdateManualInstitutionDTO{" +
        "name='" + name + '\'' +
        '}';
  }
}

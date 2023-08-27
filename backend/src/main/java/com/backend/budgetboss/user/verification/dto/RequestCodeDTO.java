package com.backend.budgetboss.user.verification.dto;

public class RequestCodeDTO {
  private String email;

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  @Override
  public String toString() {
    return "RequestCodeDTO{" +
        "email='" + email + '\'' +
        '}';
  }
}

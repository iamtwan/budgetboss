package com.backend.budgetboss.user.dto;

public class VerificationCodeDTO {
  private String verificationCode;

  public String getVerificationCode() {
    return verificationCode;
  }

  public void setVerificationCode(String verificationCode) {
    this.verificationCode = verificationCode;
  }

  @Override
  public String toString() {
    return "VerificationCodeDTO{" +
        "verificationCode='" + verificationCode + '\'' +
        '}';
  }
}

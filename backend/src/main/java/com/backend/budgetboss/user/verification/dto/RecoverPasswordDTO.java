package com.backend.budgetboss.user.verification.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class RecoverPasswordDTO {

  @Size(min = 8, max = 20, message = "Password must be 8 to 20 characters long")
  @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^!&+=])[A-Za-z\\d@#$%!^&+=]+$",
      message = "Password must be contain at least one lowercase letter, "
          + "one uppercase letter, one symbol, and one digit.")
  @NotBlank(message = "Password cannot be empty")
  private String password;

  @NotBlank(message = "Verification token cannot be empty")
  private String verificationToken;

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getVerificationToken() {
    return verificationToken;
  }

  public void setVerificationToken(String verificationToken) {
    this.verificationToken = verificationToken;
  }

  @Override
  public String toString() {
    return "RecoverPasswordDTO{" +
        "password='" + password + '\'' +
        ", verificationToken='" + verificationToken + '\'' +
        '}';
  }
}

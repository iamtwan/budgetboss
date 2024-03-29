package com.backend.budgetboss.user.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class CreateUserDTO {

  @Pattern(regexp = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$", message = "Invalid email format")
  @NotBlank(message = "Email cannot be empty")
  private String email;

  @Size(min = 8, max = 20, message = "Password must be 8 to 20 characters long")
  @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^!&+=])[A-Za-z\\d@#$%!^&+=]+$",
      message = "Password must be contain at least one lowercase letter, "
          + "one uppercase letter, one symbol, and one digit.")
  @NotBlank(message = "Password cannot be empty")
  private String password;

  @NotBlank(message = "Verification code cannot be empty")
  private String verificationCode;

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getVerificationCode() {
    return verificationCode;
  }

  public void setVerificationCode(String verificationCode) {
    this.verificationCode = verificationCode;
  }

  @Override
  public String toString() {
    return "CreateUserDTO{" +
        "email='" + email + '\'' +
        ", password='" + password + '\'' +
        ", verificationCode='" + verificationCode + '\'' +
        '}';
  }
}

package com.backend.budgetboss.user.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class ChangePasswordDTO {
  @Size(min = 8, max = 20, message = "Password must be 8 to 20 characters long")
  @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^!&+=])[A-Za-z\\d@#$%!^&+=]+$",
      message = "Password must be contain at least one lowercase letter, "
          + "one uppercase letter, one symbol, and one digit.")
  @NotBlank(message = "Password cannot be empty")
  private String password;

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  @Override
  public String toString() {
    return "ChangePasswordDTO{" +
        "password='" + password + '\'' +
        '}';
  }
}

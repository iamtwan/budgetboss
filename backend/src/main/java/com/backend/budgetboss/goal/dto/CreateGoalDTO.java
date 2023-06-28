package com.backend.budgetboss.goal.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;

public class CreateGoalDTO {

  @NotBlank(message = "Name is required")
  private String name;

  @Column(precision = 19, scale = 2)
  @NotNull(message = "Saved amount is required")
  private BigDecimal savedAmount;


  @Column(precision = 19, scale = 2)
  @DecimalMin(value = "10", message = "Target amount must be greater than or equal to 10")
  @NotNull(message = "Target amount is required")
  private BigDecimal targetAmount;

  @NotNull(message = "Target date is required")
  private LocalDate targetDate;

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public BigDecimal getSavedAmount() {
    return savedAmount;
  }

  public void setSavedAmount(BigDecimal savedAmount) {
    this.savedAmount = savedAmount;
  }

  public BigDecimal getTargetAmount() {
    return targetAmount;
  }

  public void setTargetAmount(BigDecimal targetAmount) {
    this.targetAmount = targetAmount;
  }

  public LocalDate getTargetDate() {
    return targetDate;
  }

  public void setTargetDate(LocalDate targetDate) {
    this.targetDate = targetDate;
  }

  @Override
  public String toString() {
    return "CreateGoalDTO{" +
        "name='" + name + '\'' +
        ", savedAmount=" + savedAmount +
        ", targetAmount=" + targetAmount +
        ", targetDate=" + targetDate +
        '}';
  }
}

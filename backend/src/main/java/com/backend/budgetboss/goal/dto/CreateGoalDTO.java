package com.backend.budgetboss.goal.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;

public class CreateGoalDTO {
  @NotBlank
  private String name;

  @Column(precision = 19, scale = 2)
  @NotNull
  private BigDecimal currentAmount;

  @Column(precision = 19, scale = 2)
  @NotNull
  private BigDecimal targetAmount;

  @Column(precision = 19, scale = 2)
  @NotNull
  private LocalDate targetDate;

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public BigDecimal getCurrentAmount() {
    return currentAmount;
  }

  public void setCurrentAmount(BigDecimal currentAmount) {
    this.currentAmount = currentAmount;
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
        ", currentAmount=" + currentAmount +
        ", targetAmount=" + targetAmount +
        ", targetDate=" + targetDate +
        '}';
  }
}

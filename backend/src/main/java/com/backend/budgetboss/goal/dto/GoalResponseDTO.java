package com.backend.budgetboss.goal.dto;

import com.backend.budgetboss.goal.Goal;
import com.backend.budgetboss.goal.GoalCalculation;
import com.backend.budgetboss.goal.GoalStatus;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

public class GoalResponseDTO {

  private Long id;
  private String name;
  private BigDecimal currentAmount;
  private BigDecimal targetAmount;
  private LocalDate targetDate;
  private GoalStatus status;
  private GoalCalculation calculation;

  public GoalResponseDTO() {

  }

  public GoalResponseDTO(Goal goal) {
    this.id = goal.getId();
    this.name = goal.getName();
    this.currentAmount = goal.getCurrentAmount();
    this.targetAmount = goal.getTargetAmount();
    this.targetDate = goal.getTargetDate();
    this.status = goal.getStatus();

    GoalCalculation calculation = new GoalCalculation();

    int percent = currentAmount.divide(targetAmount).multiply(BigDecimal.valueOf(100)).intValue();
    int daysRemaining = (int) Math.max(ChronoUnit.DAYS.between(LocalDate.now(), targetDate), 0);

    calculation.setPercent(percent);
    calculation.setDaysRemaining(daysRemaining);

    this.calculation = calculation;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

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

  public GoalStatus getStatus() {
    return status;
  }

  public void setStatus(GoalStatus status) {
    this.status = status;
  }

  public GoalCalculation getCalculation() {
    return calculation;
  }

  public void setCalculation(GoalCalculation calculation) {
    this.calculation = calculation;
  }

  @Override
  public String toString() {
    return "GoalResponseDTO{" +
        "id=" + id +
        ", name='" + name + '\'' +
        ", currentAmount=" + currentAmount +
        ", targetAmount=" + targetAmount +
        ", targetDate=" + targetDate +
        ", status=" + status +
        ", calculation=" + calculation +
        '}';
  }
}

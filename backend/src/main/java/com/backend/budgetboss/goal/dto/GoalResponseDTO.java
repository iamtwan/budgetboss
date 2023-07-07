package com.backend.budgetboss.goal.dto;

import com.backend.budgetboss.goal.Goal;
import com.backend.budgetboss.goal.GoalCalculation;
import com.backend.budgetboss.goal.GoalStatus;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

public class GoalResponseDTO {

  private Long id;
  private String name;
  private BigDecimal savedAmount;
  private BigDecimal targetAmount;
  private LocalDate targetDate;
  private GoalStatus status;
  private LocalDate createdAt;
  private LocalDate completedAt;
  private GoalCalculation calculation;

  public GoalResponseDTO() {

  }

  public GoalResponseDTO(Goal goal) {
    id = goal.getId();
    name = goal.getName();
    savedAmount = goal.getSavedAmount();
    targetAmount = goal.getTargetAmount();
    targetDate = goal.getTargetDate();
    status = savedAmount.compareTo(targetAmount) >= 0 ? GoalStatus.COMPLETED : GoalStatus.ACTIVE;
    createdAt = goal.getCreatedAt();
    completedAt = goal.getCompletedAt();

    GoalCalculation calculation = new GoalCalculation();

    int percent = savedAmount.divide(targetAmount, 2, RoundingMode.HALF_DOWN)
        .multiply(BigDecimal.valueOf(100)).intValue();
    int daysRemaining = (int) ChronoUnit.DAYS.between(LocalDate.now(), targetDate);

    calculation.setPercent(Math.min(percent, 100));
    calculation.setDaysRemaining(Math.max(daysRemaining, 0));
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

  public LocalDate getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(LocalDate createdAt) {
    this.createdAt = createdAt;
  }

  public LocalDate getCompletedAt() {
    return completedAt;
  }

  public void setCompletedAt(LocalDate completedAt) {
    this.completedAt = completedAt;
  }

  @Override
  public String toString() {
    return "GoalResponseDTO{" +
        "id=" + id +
        ", name='" + name + '\'' +
        ", savedAmount=" + savedAmount +
        ", targetAmount=" + targetAmount +
        ", targetDate=" + targetDate +
        ", status=" + status +
        ", calculation=" + calculation +
        ", createdAt=" + createdAt +
        ", completedAt=" + completedAt +
        '}';
  }
}

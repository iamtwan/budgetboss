package com.backend.budgetboss.goal;

import jakarta.persistence.Embeddable;
import java.time.LocalDate;

public class GoalCalculation {
  private int percent;
  private int daysRemaining;

  public int getPercent() {
    return percent;
  }

  public void setPercent(int percent) {
    this.percent = percent;
  }

  public int getDaysRemaining() {
    return daysRemaining;
  }

  public void setDaysRemaining(int daysRemaining) {
    this.daysRemaining = daysRemaining;
  }

  @Override
  public String toString() {
    return "GoalCalculation{" +
        "percent=" + percent +
        ", daysRemaining=" + daysRemaining +
        '}';
  }
}

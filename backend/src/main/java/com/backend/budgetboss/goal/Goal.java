package com.backend.budgetboss.goal;

import com.backend.budgetboss.user.User;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

@Entity
@Table(name = "goals")
public class Goal {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String name;
  private BigDecimal currentAmount;
  private BigDecimal targetAmount;
  private LocalDate targetDate;
  private GoalStatus status;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;

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

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Goal goal = (Goal) o;
    return Objects.equals(id, goal.id);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id);
  }

  @Override
  public String toString() {
    return "Goal{" +
        "id=" + id +
        ", name='" + name + '\'' +
        ", currentAmount=" + currentAmount +
        ", targetAmount=" + targetAmount +
        ", targetDate=" + targetDate +
        ", status=" + status +
        ", user=" + user.getEmail() +
        '}';
  }
}

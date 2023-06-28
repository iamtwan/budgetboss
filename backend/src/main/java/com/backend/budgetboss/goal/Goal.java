package com.backend.budgetboss.goal;

import com.backend.budgetboss.user.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

@Entity
@Table(name = "goals")
public class Goal {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

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
        ", savedAmount=" + savedAmount +
        ", targetAmount=" + targetAmount +
        ", targetDate=" + targetDate +
        ", user=" + user +
        '}';
  }
}

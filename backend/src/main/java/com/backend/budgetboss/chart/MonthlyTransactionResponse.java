package com.backend.budgetboss.chart;

import java.time.LocalDate;

public class MonthlyTransactionResponse {
  private Long id;
  private String name;
  private Double amount;
  private LocalDate date;
  private String category;

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

  public Double getAmount() {
    return amount;
  }

  public void setAmount(Double amount) {
    this.amount = amount;
  }

  public LocalDate getDate() {
    return date;
  }

  public void setDate(LocalDate date) {
    this.date = date;
  }

  public String getCategory() {
    return category;
  }

  public void setCategory(String category) {
    this.category = category;
  }

  @Override
  public String toString() {
    return "MonthlyTransactionResponse{" +
        "id=" + id +
        ", name='" + name + '\'' +
        ", amount=" + amount +
        ", date=" + date +
        ", category='" + category + '\'' +
        '}';
  }
}

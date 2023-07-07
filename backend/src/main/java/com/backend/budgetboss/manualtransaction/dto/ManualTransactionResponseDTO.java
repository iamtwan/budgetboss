package com.backend.budgetboss.manualtransaction.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class ManualTransactionResponseDTO {

  private Long id;
  private String name;
  private LocalDate date;
  private BigDecimal amount;
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

  public LocalDate getDate() {
    return date;
  }

  public void setDate(LocalDate date) {
    this.date = date;
  }

  public BigDecimal getAmount() {
    return amount;
  }

  public void setAmount(BigDecimal amount) {
    this.amount = amount;
  }

  public String getCategory() {
    return category;
  }

  public void setCategory(String category) {
    this.category = category;
  }

  @Override
  public String toString() {
    return "ManualTransactionResponseDTO{" +
        "id=" + id +
        ", name='" + name + '\'' +
        ", date=" + date +
        ", amount=" + amount +
        ", category=" + category +
        '}';
  }
}

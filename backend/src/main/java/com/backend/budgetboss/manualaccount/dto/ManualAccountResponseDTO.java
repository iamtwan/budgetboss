package com.backend.budgetboss.manualaccount.dto;

import com.backend.budgetboss.manualaccount.ManualAccountType;
import java.math.BigDecimal;

public class ManualAccountResponseDTO {

  private Long id;
  private String name;
  private BigDecimal balance;
  private ManualAccountType type;

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

  public BigDecimal getBalance() {
    return balance;
  }

  public void setBalance(BigDecimal balance) {
    this.balance = balance;
  }

  public ManualAccountType getType() {
    return type;
  }

  public void setType(ManualAccountType type) {
    this.type = type;
  }

  @Override
  public String toString() {
    return "ManualAccountResponse{" +
        "id=" + id +
        ", name='" + name + '\'' +
        ", balance=" + balance +
        ", type=" + type +
        '}';
  }
}

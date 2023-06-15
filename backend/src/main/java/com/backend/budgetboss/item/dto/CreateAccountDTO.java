package com.backend.budgetboss.item.dto;

import java.math.BigDecimal;

public class CreateAccountDTO {

  private String name;
  private String institutionName;
  private BigDecimal balance;

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getInstitutionName() {
    return institutionName;
  }

  public void setInstitutionName(String institutionName) {
    this.institutionName = institutionName;
  }

  public BigDecimal getBalance() {
    return balance;
  }

  public void setBalance(BigDecimal balance) {
    this.balance = balance;
  }

  @Override
  public String toString() {
    return "CreateAccountDTO{" +
        "name='" + name + '\'' +
        ", institutionName='" + institutionName + '\'' +
        ", balance=" + balance +
        '}';
  }
}

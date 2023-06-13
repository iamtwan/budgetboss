package com.backend.budgetboss.item.dto;

public class CreateAccountDTO {

  private String name;
  private String institutionName;
  private double balance;

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

  public double getBalance() {
    return balance;
  }

  public void setBalance(double balance) {
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

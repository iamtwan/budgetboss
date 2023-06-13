package com.backend.budgetboss.account.dto;

import com.backend.budgetboss.account.Balance;

public class BalanceResponseDTO {

  private Double available;
  private Double current;
  private String isoCurrencyCode;
  private Double balanceLimit;
  private String unofficialCurrencyCode;

  public BalanceResponseDTO(Balance balances) {
    this.available = balances.getAvailable();
    this.current = balances.getCurrent();
    this.isoCurrencyCode = balances.getIsoCurrencyCode();
    this.balanceLimit = balances.getBalanceLimit();
    this.unofficialCurrencyCode = balances.getUnofficialCurrencyCode();
  }

  public Double getAvailable() {
    return available;
  }

  public void setAvailable(Double available) {
    this.available = available;
  }

  public Double getCurrent() {
    return current;
  }

  public void setCurrent(Double current) {
    this.current = current;
  }

  public String getIsoCurrencyCode() {
    return isoCurrencyCode;
  }

  public void setIsoCurrencyCode(String isoCurrencyCode) {
    this.isoCurrencyCode = isoCurrencyCode;
  }

  public Double getBalanceLimit() {
    return balanceLimit;
  }

  public void setBalanceLimit(Double balanceLimit) {
    this.balanceLimit = balanceLimit;
  }

  public String getUnofficialCurrencyCode() {
    return unofficialCurrencyCode;
  }

  public void setUnofficialCurrencyCode(String unofficialCurrencyCode) {
    this.unofficialCurrencyCode = unofficialCurrencyCode;
  }

  @Override
  public String toString() {
    return "BalanceResponseDTO{" +
        "available=" + available +
        ", current=" + current +
        ", isoCurrencyCode='" + isoCurrencyCode + '\'' +
        ", balanceLimit=" + balanceLimit +
        ", unofficialCurrencyCode='" + unofficialCurrencyCode + '\'' +
        '}';
  }
}

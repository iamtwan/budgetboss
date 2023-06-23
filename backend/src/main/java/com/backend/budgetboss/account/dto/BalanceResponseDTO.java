package com.backend.budgetboss.account.dto;

import com.backend.budgetboss.account.Balance;
import java.math.BigDecimal;

public class BalanceResponseDTO {

  private BigDecimal available;
  private BigDecimal current;
  private String isoCurrencyCode;
  private BigDecimal balanceLimit;
  private String unofficialCurrencyCode;

  public BalanceResponseDTO(Balance balances) {
    this.available = balances.getAvailable();
    this.current = balances.getCurrent();
    this.isoCurrencyCode = balances.getIsoCurrencyCode();
    this.balanceLimit = balances.getBalanceLimit();
    this.unofficialCurrencyCode = balances.getUnofficialCurrencyCode();
  }

  public BigDecimal getAvailable() {
    return available;
  }

  public void setAvailable(BigDecimal available) {
    this.available = available;
  }

  public BigDecimal getCurrent() {
    return current;
  }

  public void setCurrent(BigDecimal current) {
    this.current = current;
  }

  public String getIsoCurrencyCode() {
    return isoCurrencyCode;
  }

  public void setIsoCurrencyCode(String isoCurrencyCode) {
    this.isoCurrencyCode = isoCurrencyCode;
  }

  public BigDecimal getBalanceLimit() {
    return balanceLimit;
  }

  public void setBalanceLimit(BigDecimal balanceLimit) {
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

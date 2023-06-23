package com.backend.budgetboss.chart;

import java.math.BigDecimal;
import java.time.Month;

public class ChartResponse {

  public Month month;
  public BigDecimal netBalance;

  public ChartResponse() {
  }

  public ChartResponse(Month month, BigDecimal netBalance) {
    this.month = month;
    this.netBalance = netBalance;
  }

  public Month getMonth() {
    return month;
  }

  public void setMonth(Month month) {
    this.month = month;
  }

  public BigDecimal getNetBalance() {
    return netBalance;
  }

  public void setNetBalance(BigDecimal netBalance) {
    this.netBalance = netBalance;
  }

  @Override
  public String toString() {
    return "ChartResponse{" +
        "month=" + month +
        ", netBalance=" + netBalance +
        '}';
  }
}

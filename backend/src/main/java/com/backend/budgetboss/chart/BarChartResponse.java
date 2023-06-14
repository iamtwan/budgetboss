package com.backend.budgetboss.chart;

import java.time.Month;

public class BarChartResponse {

  public Month month;
  public Double netBalance;

  public BarChartResponse() {
  }

  public BarChartResponse(Month month, Double netBalance) {
    this.month = month;
    this.netBalance = netBalance;
  }

  public Month getMonth() {
    return month;
  }

  public void setMonth(Month month) {
    this.month = month;
  }

  public Double getNetBalance() {
    return netBalance;
  }

  public void setNetBalance(Double netBalance) {
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

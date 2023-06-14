package com.backend.budgetboss.chart;

public class BarChartMonthlyResponse {
  private double totalDeposits;
  private double totalExpenses;
  private double netBalance;

  public double getTotalDeposits() {
    return totalDeposits;
  }

  public void setTotalDeposits(double totalDeposits) {
    this.totalDeposits = totalDeposits;
  }

  public double getTotalExpenses() {
    return totalExpenses;
  }

  public void setTotalExpenses(double totalExpenses) {
    this.totalExpenses = totalExpenses;
  }

  public double getNetBalance() {
    return netBalance;
  }

  public void setNetBalance(double netBalance) {
    this.netBalance = netBalance;
  }

  @Override
  public String toString() {
    return "BarChartMonthlyResponse{" +
        "totalDeposits=" + totalDeposits +
        ", totalExpenses=" + totalExpenses +
        ", netBalance=" + netBalance +
        '}';
  }
}

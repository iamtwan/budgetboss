package com.backend.budgetboss.chart;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ChartMonthlyResponse {

  private double totalDeposits;
  private double totalExpenses;
  private double netBalance;
  private Map<String, Double> categories = new HashMap<>();
  private Map<String, List<MonthlyTransactionResponse>> accounts = new HashMap<>();

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

  public Map<String, Double> getCategories() {
    return categories;
  }

  public void setCategories(Map<String, Double> categories) {
    this.categories = categories;
  }

  public Map<String, List<MonthlyTransactionResponse>> getAccounts() {
    return accounts;
  }

  public void setAccounts(Map<String, List<MonthlyTransactionResponse>> accounts) {
    this.accounts = accounts;
  }

  @Override
  public String toString() {
    return "ChartMonthlyResponse{" +
        "totalDeposits=" + totalDeposits +
        ", totalExpenses=" + totalExpenses +
        ", netBalance=" + netBalance +
        ", categories=" + categories +
        ", accounts=" + accounts +
        '}';
  }
}

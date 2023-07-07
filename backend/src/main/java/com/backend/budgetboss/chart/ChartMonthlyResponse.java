package com.backend.budgetboss.chart;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ChartMonthlyResponse {

  private BigDecimal totalDeposits;
  private BigDecimal totalExpenses;
  private BigDecimal netBalance;
  private Map<String, BigDecimal> categories = new HashMap<>();
  private Map<String, List<MonthlyTransactionResponse>> accounts = new HashMap<>();

  public BigDecimal getTotalDeposits() {
    return totalDeposits;
  }

  public void setTotalDeposits(BigDecimal totalDeposits) {
    this.totalDeposits = totalDeposits;
  }

  public BigDecimal getTotalExpenses() {
    return totalExpenses;
  }

  public void setTotalExpenses(BigDecimal totalExpenses) {
    this.totalExpenses = totalExpenses;
  }

  public BigDecimal getNetBalance() {
    return netBalance;
  }

  public void setNetBalance(BigDecimal netBalance) {
    this.netBalance = netBalance;
  }

  public Map<String, BigDecimal> getCategories() {
    return categories;
  }

  public void setCategories(Map<String, BigDecimal> categories) {
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

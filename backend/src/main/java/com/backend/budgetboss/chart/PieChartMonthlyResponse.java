package com.backend.budgetboss.chart;

import com.backend.budgetboss.manualtransaction.dto.ManualTransactionResponseDTO;
import com.backend.budgetboss.transaction.dto.TransactionResponseDTO;
import java.util.ArrayList;
import java.util.List;

public class PieChartMonthlyResponse {

  private List<TransactionResponseDTO> transactions = new ArrayList<>();
  private List<ManualTransactionResponseDTO> manualTransactions = new ArrayList<>();

  public PieChartMonthlyResponse() {
  }

  public PieChartMonthlyResponse(List<TransactionResponseDTO> transactions,
      List<ManualTransactionResponseDTO> manualTransactions) {
    this.transactions = transactions;
    this.manualTransactions = manualTransactions;
  }

  public List<TransactionResponseDTO> getTransactions() {
    return transactions;
  }

  public void setTransactions(List<TransactionResponseDTO> transactions) {
    this.transactions = transactions;
  }

  public List<ManualTransactionResponseDTO> getManualTransactions() {
    return manualTransactions;
  }

  public void setManualTransactions(List<ManualTransactionResponseDTO> manualTransactions) {
    this.manualTransactions = manualTransactions;
  }

  @Override
  public String toString() {
    return "PieChartMonthlyResponse{" +
        "transactions=" + transactions +
        ", manualTransactions=" + manualTransactions +
        '}';
  }
}

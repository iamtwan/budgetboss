package com.backend.budgetboss.chart;

import com.backend.budgetboss.manualaccount.ManualAccountType;
import com.backend.budgetboss.manualtransaction.ManualTransaction;
import com.backend.budgetboss.manualtransaction.ManualTransactionRepository;
import com.backend.budgetboss.manualtransaction.dto.ManualTransactionResponseDTO;
import com.backend.budgetboss.transaction.TransactionEntity;
import com.backend.budgetboss.transaction.TransactionRepository;
import com.backend.budgetboss.transaction.dto.TransactionResponseDTO;
import com.backend.budgetboss.user.User;
import com.plaid.client.model.AccountType;
import java.time.LocalDate;
import java.time.Month;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class ChartServiceImpl implements ChartService {

  private final TransactionRepository transactionRepository;
  private final ManualTransactionRepository manualTransactionRepository;
  private final ModelMapper modelMapper;

  public ChartServiceImpl(TransactionRepository transactionRepository,
      ManualTransactionRepository manualTransactionRepository,
      ModelMapper modelMapper) {
    this.transactionRepository = transactionRepository;
    this.manualTransactionRepository = manualTransactionRepository;
    this.modelMapper = modelMapper;
  }

  @Override
  public List<ChartResponse> getChartData(User user) {
    LocalDate startDate = getStartDate(5);
    LocalDate endDate = startDate.plusMonths(6);

    List<TransactionEntity> transactions = transactionRepository
        .findByAccount_Item_UserAndDateBetween(user, startDate, endDate);

    List<ManualTransaction> manualTransactions = manualTransactionRepository
        .findByManualAccount_ManualInstitution_UserAndDateBetween(user, startDate, endDate);

    Map<Month, Double> monthlyTransactions = new LinkedHashMap<>();

    for (int i = 0; i < 6; i++) {
      monthlyTransactions.put(startDate.getMonth(), 0.0);
      startDate = startDate.plusMonths(1);
    }

    for (TransactionEntity transaction : transactions) {
      Month month = transaction.getDate().getMonth();
      AccountType type = transaction.getAccount().getType();

      double amount = transaction.getAmount();
      amount *= type.toString().equals("credit") ? 1 : -1;

      monthlyTransactions.merge(month, amount, Double::sum);
    }

    for (ManualTransaction transaction : manualTransactions) {
      Month month = transaction.getDate().getMonth();
      ManualAccountType type = transaction.getManualAccount().getType();

      double amount = transaction.getAmount().doubleValue();
      amount *= type.toString().equals("credit") ? 1 : -1;

      monthlyTransactions.merge(month, amount, Double::sum);
    }

    return monthlyTransactions.entrySet().stream()
        .map(entry -> new ChartResponse(entry.getKey(), entry.getValue()))
        .toList();
  }

  @Override
  public Map<String, ChartTransactionsResponse> getTransactionsForMonth(User user, Month month) {
    LocalDate startDate = getStartDate(month);
    LocalDate endDate = startDate.plusMonths(1);

    List<TransactionEntity> transactions = transactionRepository
        .findByAccount_Item_UserAndDateBetween(user, startDate, endDate);

    List<ManualTransaction> manualTransactions = manualTransactionRepository
        .findByManualAccount_ManualInstitution_UserAndDateBetween(user, startDate, endDate);

    Map<String, ChartTransactionsResponse> response = new HashMap<>();

    for (TransactionEntity transaction : transactions) {
      String type = transaction.getAccount().getType().toString();
      TransactionResponseDTO dto = modelMapper.map(transaction, TransactionResponseDTO.class);

      response.putIfAbsent(type, new ChartTransactionsResponse());
      response.get(type).getTransactions().add(dto);
    }

    for (ManualTransaction transaction : manualTransactions) {
      String type = transaction.getManualAccount().getType().toString();
      ManualTransactionResponseDTO dto = modelMapper.map(transaction,
          ManualTransactionResponseDTO.class);

      response.putIfAbsent(type, new ChartTransactionsResponse());
      response.get(type).getManualTransactions().add(dto);
    }

    return response;
  }

  private LocalDate getStartDate(int months) {
    LocalDate today = LocalDate.now();
    LocalDate startDate = LocalDate.of(today.getYear(), today.minusMonths(months).getMonth(), 1);

    if (startDate.isAfter(today)) {
      startDate = startDate.minusYears(1);
    }

    return startDate;
  }

  private LocalDate getStartDate(Month month) {
    return getStartDate(0);
  }
}

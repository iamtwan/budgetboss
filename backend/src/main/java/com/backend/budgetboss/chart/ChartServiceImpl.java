package com.backend.budgetboss.chart;

import com.backend.budgetboss.manualaccount.ManualAccountType;
import com.backend.budgetboss.manualtransaction.ManualTransaction;
import com.backend.budgetboss.manualtransaction.ManualTransactionRepository;
import com.backend.budgetboss.transaction.TransactionEntity;
import com.backend.budgetboss.transaction.TransactionRepository;
import com.backend.budgetboss.user.User;
import com.plaid.client.model.AccountType;
import java.time.LocalDate;
import java.time.Month;
import java.util.ArrayList;
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
    LocalDate startDate = getStartDate();
    LocalDate endDate = startDate.plusMonths(5);
    endDate = endDate.withDayOfMonth(endDate.lengthOfMonth());
    
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
  public ChartMonthlyResponse getChartMonthlyData(User user, Month month) {
    LocalDate startDate = getStartDate(month);
    LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());

    List<TransactionEntity> transactions = transactionRepository
        .findByAccount_Item_UserAndDateBetween(user, startDate, endDate);

    List<ManualTransaction> manualTransactions = manualTransactionRepository
        .findByManualAccount_ManualInstitution_UserAndDateBetween(user, startDate, endDate);

    double totalDeposits = 0;
    double totalExpenses = 0;

    Map<String, Double> categories = new HashMap<>();
    Map<String, List<MonthlyTransactionResponse>> accounts = new HashMap<>();

    for (TransactionEntity transaction : transactions) {
      String accountName = transaction.getAccount().getName();
      String category = transaction.getCategory().toLowerCase();
      double amount = transaction.getAmount();

      accounts.putIfAbsent(accountName, new ArrayList<>());
      accounts.get(accountName).add(modelMapper.map(transaction, MonthlyTransactionResponse.class));

      if (amount >= 0) {
        totalExpenses += amount;
        categories.merge(category, amount, Double::sum);
      } else {
        totalDeposits += Math.abs(amount);
      }
    }

    for (ManualTransaction transaction : manualTransactions) {
      String accountName = transaction.getManualAccount().getName();
      String category = transaction.getCategory().toLowerCase();
      double amount = transaction.getAmount().doubleValue();

      accounts.putIfAbsent(accountName, new ArrayList<>());
      accounts.get(accountName).add(modelMapper.map(transaction, MonthlyTransactionResponse.class));

      if (amount >= 0) {
        totalExpenses += amount;
        categories.merge(category, amount, Double::sum);
      } else {
        totalDeposits += Math.abs(amount);
      }
    }

    ChartMonthlyResponse response = new ChartMonthlyResponse();
    response.setTotalDeposits(totalDeposits);
    response.setTotalExpenses(totalExpenses);
    response.setNetBalance(totalDeposits - totalExpenses);
    response.setCategories(categories);
    response.setAccounts(accounts);

    return response;
  }

//  @Override
//  public Map<String, BarChartMonthlyResponse> getBarChartMonthlyData(User user, Month month) {
//    LocalDate startDate = getStartDate(month);
//    LocalDate endDate = startDate.plusMonths(1);
//
//    List<TransactionEntity> transactions = transactionRepository
//        .findByAccount_Item_UserAndDateBetween(user, startDate, endDate);
//
//    List<ManualTransaction> manualTransactions = manualTransactionRepository
//        .findByManualAccount_ManualInstitution_UserAndDateBetween(user, startDate, endDate);
//
//    Map<String, BarChartMonthlyResponse> response = new HashMap<>();
//
//    for (TransactionEntity transaction : transactions) {
//      String type = transaction.getAccount().getType().toString();
//      TransactionResponseDTO dto = modelMapper.map(transaction, TransactionResponseDTO.class);
//
//      response.putIfAbsent(type, new BarChartMonthlyResponse());
//      response.get(type).getTransactions().add(dto);
//    }
//
//    for (ManualTransaction transaction : manualTransactions) {
//      String type = transaction.getManualAccount().getType().toString();
//      ManualTransactionResponseDTO dto = modelMapper
//          .map(transaction, ManualTransactionResponseDTO.class);
//
//      response.putIfAbsent(type, new BarChartMonthlyResponse());
//      response.get(type).getManualTransactions().add(dto);
//    }
//
//    return response;
//  }

  private LocalDate getStartDate(Month month) {
    LocalDate today = LocalDate.now();
    LocalDate startDate = LocalDate.of(today.getYear(), month, 1);

    if (startDate.isAfter(today)) {
      startDate = startDate.minusYears(1);
    }

    return startDate;
  }

  private LocalDate getStartDate() {
    return getStartDate(LocalDate.now().minusMonths(5).getMonth());
  }
}

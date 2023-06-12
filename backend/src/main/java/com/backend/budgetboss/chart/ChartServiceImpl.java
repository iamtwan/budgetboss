package com.backend.budgetboss.chart;

import com.backend.budgetboss.manualtransaction.ManualTransaction;
import com.backend.budgetboss.manualtransaction.ManualTransactionRepository;
import com.backend.budgetboss.transaction.TransactionEntity;
import com.backend.budgetboss.transaction.TransactionRepository;
import com.backend.budgetboss.user.User;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Month;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

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
    public List<ChartResponse> getCharts(User user) {
        LocalDate fiveMonthsAgo = LocalDate.now().minusMonths(5);

        List<TransactionEntity> transactions = transactionRepository.findByDateAfter(fiveMonthsAgo);
        List<ManualTransaction> manualTransactions = manualTransactionRepository.findByDateAfter(fiveMonthsAgo);

        Map<Month, Double> monthlyTransactions = new LinkedHashMap<>();

        for (int i = 0; i < 6; i++) {
            monthlyTransactions.put(fiveMonthsAgo.getMonth(), 0.0);
            fiveMonthsAgo = fiveMonthsAgo.plusMonths(1);
        }

        for (TransactionEntity transaction : transactions) {
            Month month = transaction.getDate().getMonth();
            monthlyTransactions.merge(month, transaction.getAmount(), Double::sum);
        }

        for (ManualTransaction manualTransaction : manualTransactions) {
            Month month = manualTransaction.getDate().getMonth();
            monthlyTransactions.merge(month, manualTransaction.getAmount().doubleValue(), Double::sum);
        }

        return monthlyTransactions.entrySet().stream()
                .map(entry -> new ChartResponse(entry.getKey(), entry.getValue()))
                .toList();
    }
}

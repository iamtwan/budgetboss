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


    public ChartServiceImpl(TransactionRepository transactionRepository, ManualTransactionRepository manualTransactionRepository, ModelMapper modelMapper) {
        this.transactionRepository = transactionRepository;
        this.manualTransactionRepository = manualTransactionRepository;
		this.modelMapper = modelMapper;
	}

    @Override
    public List<ChartResponse> getChartData(User user) {
        LocalDate fiveMonthsAgo = LocalDate.now().minusMonths(5);

        List<TransactionEntity> transactions = transactionRepository.findByAccount_Item_UserAndDateAfter(user, fiveMonthsAgo);
        List<ManualTransaction> manualTransactions = manualTransactionRepository.findByManualAccount_ManualInstitution_UserAndDateAfter(user, fiveMonthsAgo);

        Map<Month, Double> monthlyTransactions = new LinkedHashMap<>();

        for (int i = 0; i < 6; i++) {
            monthlyTransactions.put(fiveMonthsAgo.getMonth(), 0.0);
            fiveMonthsAgo = fiveMonthsAgo.plusMonths(1);
        }

        for (TransactionEntity transaction : transactions) {
            Month month = transaction.getDate().getMonth();
			AccountType type = transaction.getAccount().getType();

			double amount = type.toString().equals("credit") ? transaction.getAmount() : -transaction.getAmount();
            monthlyTransactions.merge(month, amount, Double::sum);
        }

        for (ManualTransaction manualTransaction : manualTransactions) {
            Month month = manualTransaction.getDate().getMonth();
			ManualAccountType type = manualTransaction.getManualAccount().getType();

			double amount = type.toString().equals("credit") ? manualTransaction.getAmount().doubleValue() : -manualTransaction.getAmount().doubleValue();
			monthlyTransactions.merge(month, amount, Double::sum);
        }

        return monthlyTransactions.entrySet().stream()
                .map(entry -> new ChartResponse(entry.getKey(), entry.getValue()))
                .toList();
    }

	@Override
	public ChartTransactionsResponse getTransactionsForMonth(User user, Month month) {
		LocalDate today = LocalDate.now();
		LocalDate startDate = LocalDate.of(today.getYear(), month, 1);

		if (startDate.isAfter(today)) {
			startDate = startDate.minusYears(1);
		}

		LocalDate endDate = startDate.plusMonths(1);

		List<TransactionResponseDTO> transactions = transactionRepository
			.findByAccount_Item_UserAndDateBetween(user, startDate, endDate)
			.stream()
			.map(transaction -> modelMapper.map(transaction, TransactionResponseDTO.class))
			.toList();

		List<ManualTransactionResponseDTO> manualTransactions = manualTransactionRepository
			.findByManualAccount_ManualInstitution_UserAndDateBetween(user, startDate, endDate)
			.stream()
			.map(transaction -> modelMapper.map(transaction, ManualTransactionResponseDTO.class))
			.toList();

		return new ChartTransactionsResponse(transactions, manualTransactions);
	}
}

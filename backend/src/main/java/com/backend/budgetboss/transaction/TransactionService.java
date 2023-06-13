package com.backend.budgetboss.transaction;

import com.backend.budgetboss.transaction.dto.TransactionResponseDTO;
import java.io.IOException;
import java.util.List;

public interface TransactionService {

  void syncTransactions(String itemId) throws IOException;

  List<TransactionResponseDTO> getTransactionsByAccountId(Long id);
}

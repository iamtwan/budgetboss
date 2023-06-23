package com.backend.budgetboss.manualtransaction;


import com.backend.budgetboss.manualtransaction.dto.CreateManualTransactionDTO;
import com.backend.budgetboss.manualtransaction.dto.ManualTransactionResponseDTO;
import com.backend.budgetboss.user.User;
import java.util.List;

public interface ManualTransactionService {

  List<ManualTransactionResponseDTO> getManualTransactions(User user, Long id);

  ManualTransactionResponseDTO createManualTransaction(User user, Long id,
      CreateManualTransactionDTO manualTransactionDTO);

  ManualTransactionResponseDTO updateManualTransaction(User user, Long id,
      CreateManualTransactionDTO manualTransactionDTO);

  void deleteManualTransaction(User user, Long transactionId);
}

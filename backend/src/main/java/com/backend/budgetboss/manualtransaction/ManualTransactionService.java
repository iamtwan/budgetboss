package com.backend.budgetboss.manualtransaction;


import com.backend.budgetboss.manualtransaction.dto.CreateManualTransactionDTO;
import com.backend.budgetboss.manualtransaction.dto.ManualTransactionResponseDTO;

import java.util.List;

public interface ManualTransactionService {
    List<ManualTransactionResponseDTO> getManualTransactions(Long id);
    ManualTransactionResponseDTO createManualTransaction(Long id, CreateManualTransactionDTO manualTransactionDTO);
}

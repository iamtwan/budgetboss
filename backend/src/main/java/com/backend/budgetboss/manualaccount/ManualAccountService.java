package com.backend.budgetboss.manualaccount;

import com.backend.budgetboss.manualaccount.dto.CreateManualAccountDTO;
import com.backend.budgetboss.manualaccount.dto.ManualAccountResponseDTO;

public interface ManualAccountService {
    ManualAccountResponseDTO createManualAccount(CreateManualAccountDTO manualAccountDTO);
}

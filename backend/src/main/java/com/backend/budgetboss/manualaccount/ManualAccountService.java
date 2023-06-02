package com.backend.budgetboss.manualaccount;

import com.backend.budgetboss.manualaccount.dto.CreateManualAccountDTO;
import com.backend.budgetboss.manualaccount.dto.ManualAccountResponseDTO;
import com.backend.budgetboss.manualaccount.dto.UpdateManualAccountDTO;

public interface ManualAccountService {
    ManualAccountResponseDTO createManualAccount(CreateManualAccountDTO manualAccountDTO);
    ManualAccountResponseDTO updateManualAccount(Long id, UpdateManualAccountDTO manualAccountDTO);
    void deleteManualAccount(Long id);
}

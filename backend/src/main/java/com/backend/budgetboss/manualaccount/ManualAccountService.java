package com.backend.budgetboss.manualaccount;

import com.backend.budgetboss.manualaccount.dto.CreateManualAccountDTO;
import com.backend.budgetboss.manualaccount.dto.ManualAccountResponseDTO;
import com.backend.budgetboss.manualaccount.dto.UpdateManualAccountDTO;
import com.backend.budgetboss.user.User;

public interface ManualAccountService {

  ManualAccountResponseDTO createManualAccount(User user, CreateManualAccountDTO manualAccountDTO);

  ManualAccountResponseDTO updateManualAccount(User user,
      Long id,
      UpdateManualAccountDTO manualAccountDTO);

  void deleteManualAccount(User user, Long id);
}

package com.backend.budgetboss.manualaccount.helper;

import com.backend.budgetboss.manualaccount.ManualAccount;
import com.backend.budgetboss.manualaccount.ManualAccountRepository;
import com.backend.budgetboss.manualaccount.exception.ManualAccountNotFoundException;
import com.backend.budgetboss.manualaccount.exception.ManualAccountOwnershipException;
import com.backend.budgetboss.user.User;
import org.springframework.stereotype.Component;

@Component
public class ManualAccountHelper {

  private final ManualAccountRepository manualAccountRepository;

  public ManualAccountHelper(ManualAccountRepository manualAccountRepository) {
    this.manualAccountRepository = manualAccountRepository;
  }

  public ManualAccount getAccount(Long id) {
    return manualAccountRepository.findById(id)
        .orElseThrow(
            () -> new ManualAccountNotFoundException("Manual Account not found with id: " + id));
  }

  public void assertAccountOwnership(User user, ManualAccount account) {
    if (!account.getManualInstitution().getUser().equals(user)) {
      throw new ManualAccountOwnershipException(
          "Manual Account does not belong to user: " + user.getEmail());
    }
  }
}

package com.backend.budgetboss.manualtransaction.helper;

import com.backend.budgetboss.manualinstitution.exception.ManualInstitutionOwnershipException;
import com.backend.budgetboss.manualtransaction.ManualTransaction;
import com.backend.budgetboss.manualtransaction.ManualTransactionRepository;
import com.backend.budgetboss.manualtransaction.exception.ManualTransactionNotFoundException;
import com.backend.budgetboss.user.User;
import org.springframework.stereotype.Component;

@Component
public class ManualTransactionHelper {

  private final ManualTransactionRepository manualTransactionRepository;

  public ManualTransactionHelper(ManualTransactionRepository manualTransactionRepository) {
    this.manualTransactionRepository = manualTransactionRepository;
  }

  public ManualTransaction getManualTransaction(Long id) {
    return manualTransactionRepository.findById(id)
        .orElseThrow(() -> new ManualTransactionNotFoundException(
            "Manual Transaction not found with id: " + id));
  }

  public void assertManualTransactionOwnership(User user, ManualTransaction manualTransaction) {
    if (!manualTransaction.getManualAccount().getManualInstitution().getUser().equals(user)) {
      throw new ManualInstitutionOwnershipException(
          "Manual Transaction does not belong to user: " + user.getEmail());
    }
  }
}

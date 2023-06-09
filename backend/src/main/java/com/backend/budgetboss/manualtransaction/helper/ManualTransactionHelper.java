package com.backend.budgetboss.manualtransaction.helper;

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

  public ManualTransaction getById(Long id) {
    return manualTransactionRepository.findById(id)
        .orElseThrow(() -> new ManualTransactionNotFoundException(id));
  }

  public ManualTransaction getByUserAndId(User user, Long id) {
    return manualTransactionRepository.findByManualAccount_ManualInstitution_UserAndId(user, id)
        .orElseThrow(() -> new ManualTransactionNotFoundException(id));
  }
}

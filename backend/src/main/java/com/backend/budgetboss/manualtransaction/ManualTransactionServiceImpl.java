package com.backend.budgetboss.manualtransaction;

import com.backend.budgetboss.manualaccount.ManualAccount;
import com.backend.budgetboss.manualaccount.ManualAccountType;
import com.backend.budgetboss.manualaccount.helper.ManualAccountHelper;
import com.backend.budgetboss.manualtransaction.dto.CreateManualTransactionDTO;
import com.backend.budgetboss.manualtransaction.dto.ManualTransactionResponseDTO;
import com.backend.budgetboss.manualtransaction.helper.ManualTransactionHelper;
import com.backend.budgetboss.user.User;
import com.backend.budgetboss.user.helper.UserHelper;
import java.math.BigDecimal;
import java.util.List;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ManualTransactionServiceImpl implements ManualTransactionService {

  private final ManualTransactionRepository manualTransactionRepository;
  private final ManualTransactionHelper manualTransactionHelper;
  private final UserHelper userHelper;
  private final ManualAccountHelper accountHelper;
  private final ModelMapper modelMapper;

  public ManualTransactionServiceImpl(ManualTransactionRepository manualTransactionRepository,
      ManualTransactionHelper manualTransactionHelper,
      UserHelper userHelper,
      ManualAccountHelper accountHelper,
      ModelMapper modelMapper) {
    this.manualTransactionRepository = manualTransactionRepository;
    this.manualTransactionHelper = manualTransactionHelper;
    this.userHelper = userHelper;
    this.accountHelper = accountHelper;
    this.modelMapper = modelMapper;
  }

  @Override
  public List<ManualTransactionResponseDTO> getManualTransactions(Long id) {
    return manualTransactionRepository.findAllByManualAccountId(id)
        .stream()
        .map(manualTransaction -> modelMapper
            .map(manualTransaction, ManualTransactionResponseDTO.class))
        .toList();
  }

  @Override
  @Transactional
  public ManualTransactionResponseDTO createManualTransaction(Long id,
      CreateManualTransactionDTO manualTransactionDTO) {
    User user = userHelper.getUser();
    ManualAccount account = accountHelper.getAccount(id);

    accountHelper.assertAccountOwnership(user, account);

    ManualTransaction manualTransaction = modelMapper
        .map(manualTransactionDTO, ManualTransaction.class);
    manualTransaction.setManualAccount(account);

    BigDecimal amount = manualTransaction.getAmount();

    if (account.getType().equals(ManualAccountType.DEPOSITORY)) {
      account.setBalance(account.getBalance().subtract(amount));
    } else {
      account.setBalance(account.getBalance().add(amount));
    }

    return modelMapper.map(manualTransactionRepository.save(manualTransaction),
        ManualTransactionResponseDTO.class);
  }

  @Override
  @Transactional
  public ManualTransactionResponseDTO updateManualTransaction(Long id,
      CreateManualTransactionDTO manualTransactionDTO) {
    User user = userHelper.getUser();
    ManualTransaction manualTransaction = manualTransactionHelper.getManualTransaction(id);

    manualTransactionHelper.assertManualTransactionOwnership(user, manualTransaction);

    modelMapper.map(manualTransactionDTO, manualTransaction);
    return modelMapper.map(manualTransactionRepository.save(manualTransaction),
        ManualTransactionResponseDTO.class);
  }

  @Override
  public void deleteManualTransaction(Long transactionId) {
    User user = userHelper.getUser();
    ManualTransaction manualTransaction = manualTransactionHelper.getManualTransaction(
        transactionId);

    manualTransactionHelper.assertManualTransactionOwnership(user, manualTransaction);
    manualTransactionRepository.delete(manualTransaction);
  }
}

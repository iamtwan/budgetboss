package com.backend.budgetboss.manualtransaction;

import com.backend.budgetboss.manualaccount.ManualAccount;
import com.backend.budgetboss.manualaccount.ManualAccountType;
import com.backend.budgetboss.manualaccount.helper.ManualAccountHelper;
import com.backend.budgetboss.manualtransaction.dto.CreateManualTransactionDTO;
import com.backend.budgetboss.manualtransaction.dto.ManualTransactionResponseDTO;
import com.backend.budgetboss.manualtransaction.helper.ManualTransactionHelper;
import com.backend.budgetboss.user.User;
import java.math.BigDecimal;
import java.util.List;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ManualTransactionServiceImpl implements ManualTransactionService {

  private final ManualTransactionRepository manualTransactionRepository;
  private final ManualTransactionHelper manualTransactionHelper;
  private final ManualAccountHelper accountHelper;
  private final ModelMapper modelMapper;

  public ManualTransactionServiceImpl(ManualTransactionRepository manualTransactionRepository,
      ManualTransactionHelper manualTransactionHelper,
      ManualAccountHelper accountHelper,
      ModelMapper modelMapper) {
    this.manualTransactionRepository = manualTransactionRepository;
    this.manualTransactionHelper = manualTransactionHelper;
    this.accountHelper = accountHelper;
    this.modelMapper = modelMapper;
  }

  @Override
  public List<ManualTransactionResponseDTO> getManualTransactionsById(User user, Long id) {
    ManualAccount account = accountHelper.getAccountByUserAndId(user, id);

    return account.getManualTransactions()
        .stream()
        .map(manualTransaction -> modelMapper
            .map(manualTransaction, ManualTransactionResponseDTO.class))
        .toList();
  }

  @Override
  @Transactional
  public ManualTransactionResponseDTO createManualTransaction(User user, Long id,
      CreateManualTransactionDTO manualTransactionDTO) {
    ManualAccount account = accountHelper.getAccountByUserAndId(user, id);

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
  public ManualTransactionResponseDTO updateManualTransaction(User user, Long id,
      CreateManualTransactionDTO manualTransactionDTO) {
    ManualTransaction manualTransaction = manualTransactionHelper.getByUserAndId(user, id);

    modelMapper.map(manualTransactionDTO, manualTransaction);
    return modelMapper.map(manualTransactionRepository.save(manualTransaction),
        ManualTransactionResponseDTO.class);
  }

  @Override
  public void deleteManualTransaction(User user, Long id) {
    ManualTransaction manualTransaction = manualTransactionHelper.getByUserAndId(user, id);
    manualTransactionRepository.delete(manualTransaction);
  }
}

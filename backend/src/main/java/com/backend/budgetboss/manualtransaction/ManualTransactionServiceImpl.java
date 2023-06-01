package com.backend.budgetboss.manualtransaction;

import com.backend.budgetboss.manualaccount.ManualAccount;
import com.backend.budgetboss.manualaccount.util.ManualAccountUtil;
import com.backend.budgetboss.manualtransaction.dto.CreateManualTransactionDTO;
import com.backend.budgetboss.manualtransaction.dto.ManualTransactionResponseDTO;
import com.backend.budgetboss.user.User;
import com.backend.budgetboss.user.util.UserUtil;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ManualTransactionServiceImpl implements ManualTransactionService {
    private final ManualTransactionRepository manualTransactionRepository;
    private final UserUtil userUtil;
    private final ManualAccountUtil accountUtil;
    private final ModelMapper modelMapper;

    public ManualTransactionServiceImpl(ManualTransactionRepository manualTransactionRepository,
                                        UserUtil userUtil,
                                        ManualAccountUtil accountUtil,
                                        ModelMapper modelMapper) {
        this.manualTransactionRepository = manualTransactionRepository;
        this.userUtil = userUtil;
        this.accountUtil = accountUtil;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<ManualTransactionResponseDTO> getManualTransactions(Long id) {
        return manualTransactionRepository.findAllByManualAccountId(id)
                .stream()
                .map(manualTransaction -> modelMapper.map(manualTransaction, ManualTransactionResponseDTO.class))
                .toList();
    }

    @Override
    public ManualTransactionResponseDTO createManualTransaction(Long id, CreateManualTransactionDTO manualTransactionDTO) {
        User user = userUtil.getUser();
        ManualAccount account = accountUtil.getAccount(id);

        accountUtil.assertAccountOwnership(user, account);

        ManualTransaction manualTransaction = modelMapper.map(manualTransactionDTO, ManualTransaction.class);
        manualTransaction.setManualAccount(account);

        return modelMapper.map(manualTransactionRepository.save(manualTransaction), ManualTransactionResponseDTO.class);
    }
}

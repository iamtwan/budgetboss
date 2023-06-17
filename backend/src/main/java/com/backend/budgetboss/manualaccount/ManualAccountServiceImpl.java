package com.backend.budgetboss.manualaccount;

import com.backend.budgetboss.manualaccount.dto.CreateManualAccountDTO;
import com.backend.budgetboss.manualaccount.dto.ManualAccountResponseDTO;
import com.backend.budgetboss.manualaccount.dto.UpdateManualAccountDTO;
import com.backend.budgetboss.manualaccount.helper.ManualAccountHelper;
import com.backend.budgetboss.manualinstitution.ManualInstitution;
import com.backend.budgetboss.manualinstitution.ManualInstitutionRepository;
import com.backend.budgetboss.manualinstitution.helper.ManualInstitutionHelper;
import com.backend.budgetboss.user.User;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ManualAccountServiceImpl implements ManualAccountService {

  private final ManualAccountRepository manualAccountRepository;
  private final ManualInstitutionRepository manualInstitutionRepository;
  private final ManualAccountHelper manualAccountHelper;
  private final ManualInstitutionHelper manualInstitutionHelper;
  private final ModelMapper modelMapper;

  public ManualAccountServiceImpl(ManualAccountRepository manualAccountRepository,
      ManualInstitutionRepository manualInstitutionRepository,
      ManualAccountHelper manualAccountHelper,
      ManualInstitutionHelper manualInstitutionHelper,
      ModelMapper modelMapper) {
    this.manualAccountRepository = manualAccountRepository;
    this.manualInstitutionRepository = manualInstitutionRepository;
    this.manualAccountHelper = manualAccountHelper;
    this.manualInstitutionHelper = manualInstitutionHelper;
    this.modelMapper = modelMapper;
  }

  @Override
  @Transactional
  public ManualAccountResponseDTO createManualAccount(User user,
      CreateManualAccountDTO manualAccountDTO) {
    ManualInstitution manualInstitution = manualInstitutionHelper
        .getByUserAndName(user, manualAccountDTO.getInstitutionName())
        .orElse(new ManualInstitution(manualAccountDTO.getInstitutionName(), user));

    manualInstitutionRepository.save(manualInstitution);

    ManualAccount manualAccount = modelMapper.map(manualAccountDTO, ManualAccount.class);
    manualAccount.setManualInstitution(manualInstitution);

    return modelMapper.map(manualAccountRepository.save(manualAccount),
        ManualAccountResponseDTO.class);
  }

  @Override
  @Transactional
  public ManualAccountResponseDTO updateManualAccount(User user,
      Long id,
      UpdateManualAccountDTO manualAccountDTO) {
    ManualAccount manualAccount = manualAccountHelper.getAccountByUserAndId(user, id);

    modelMapper.map(manualAccountDTO, manualAccount);
    return modelMapper.map(manualAccountRepository.save(manualAccount),
        ManualAccountResponseDTO.class);
  }

  @Override
  @Transactional
  public void deleteManualAccount(User user, Long id) {
    ManualAccount manualAccount = manualAccountHelper.getAccountByUserAndId(user, id);
    ManualInstitution manualInstitution = manualAccount.getManualInstitution();

    if (manualInstitution.getManualAccounts().size() == 1) {
      manualInstitutionRepository.delete(manualInstitution);
    } else {
      manualInstitution.getManualAccounts().remove(manualAccount);
      manualInstitutionRepository.save(manualInstitution);
    }
  }
}

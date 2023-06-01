package com.backend.budgetboss.manualaccount;

import com.backend.budgetboss.manualaccount.dto.CreateManualAccountDTO;
import com.backend.budgetboss.manualaccount.dto.ManualAccountResponseDTO;
import com.backend.budgetboss.manualinstitution.ManualInstitution;
import com.backend.budgetboss.manualinstitution.ManualInstitutionRepository;
import com.backend.budgetboss.manualinstitution.util.ManualInstitutionUtil;
import com.backend.budgetboss.user.User;
import com.backend.budgetboss.user.util.UserUtil;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ManualAccountServiceImpl implements ManualAccountService {
    private final ManualAccountRepository manualAccountRepository;
    private final ManualInstitutionRepository manualInstitutionRepository;
    private final UserUtil userUtil;
    private final ManualInstitutionUtil manualInstitutionUtil;
    private final ModelMapper modelMapper;

    public ManualAccountServiceImpl(ManualAccountRepository manualAccountRepository,
                                    ManualInstitutionRepository manualInstitutionRepository,
                                    UserUtil userUtil,
                                    ManualInstitutionUtil manualInstitutionUtil,
                                    ModelMapper modelMapper) {
        this.manualAccountRepository = manualAccountRepository;
        this.manualInstitutionRepository = manualInstitutionRepository;
        this.userUtil = userUtil;
        this.manualInstitutionUtil = manualInstitutionUtil;
        this.modelMapper = modelMapper;
    }

    @Override
    @Transactional
    public ManualAccountResponseDTO createManualAccount(CreateManualAccountDTO manualAccountDTO) {
        User user = userUtil.getUser();
        ManualInstitution manualInstitution = manualInstitutionUtil
                .getManualInstitutionByUserAndName(user, manualAccountDTO.getInstitutionName())
                .orElse(new ManualInstitution(manualAccountDTO.getInstitutionName(), user));

        manualInstitutionRepository.save(manualInstitution);

        ManualAccount manualAccount = modelMapper.map(manualAccountDTO, ManualAccount.class);
        manualAccount.setManualInstitution(manualInstitution);

        return modelMapper.map(manualAccountRepository.save(manualAccount), ManualAccountResponseDTO.class);
    }
}

package com.backend.budgetboss.manualinstitution;

import com.backend.budgetboss.manualinstitution.dto.ManualInstitutionResponseDTO;
import com.backend.budgetboss.user.util.UserUtil;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ManualInstitutionServiceImpl implements ManualInstitutionService {
    private final ManualInstitutionRepository manualInstitutionRepository;
    private final UserUtil userUtil;
    private final ModelMapper modelMapper;

    public ManualInstitutionServiceImpl(ManualInstitutionRepository manualInstitutionRepository,
                                        UserUtil userUtil,
                                        ModelMapper modelMapper) {
        this.manualInstitutionRepository = manualInstitutionRepository;
        this.userUtil = userUtil;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<ManualInstitutionResponseDTO> getManualInstitutions() {
        return manualInstitutionRepository.findByUser(userUtil.getUser())
                .stream()
                .map(manualInstitution -> modelMapper.map(manualInstitution, ManualInstitutionResponseDTO.class))
                .toList();
    }
}

package com.backend.budgetboss.manualinstitution;

import com.backend.budgetboss.manualinstitution.dto.ManualInstitutionResponseDTO;
import com.backend.budgetboss.manualinstitution.dto.UpdateManualInstitutionDTO;
import com.backend.budgetboss.manualinstitution.helper.ManualInstitutionHelper;
import com.backend.budgetboss.user.User;
import java.util.List;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class ManualInstitutionServiceImpl implements ManualInstitutionService {

  private final ManualInstitutionRepository manualInstitutionRepository;
  private final ManualInstitutionHelper manualInstitutionHelper;
  private final ModelMapper modelMapper;

  public ManualInstitutionServiceImpl(ManualInstitutionRepository manualInstitutionRepository,
      ManualInstitutionHelper manualInstitutionHelper,
      ModelMapper modelMapper) {
    this.manualInstitutionRepository = manualInstitutionRepository;
    this.manualInstitutionHelper = manualInstitutionHelper;
    this.modelMapper = modelMapper;
  }

  @Override
  public List<ManualInstitutionResponseDTO> getManualInstitutions(User user) {
    return manualInstitutionRepository.findByUser(user)
        .stream()
        .map(manualInstitution -> modelMapper.map(manualInstitution,
            ManualInstitutionResponseDTO.class))
        .toList();
  }

  @Override
  public ManualInstitutionResponseDTO updateManualInstitution(
      User user,
      Long id,
      UpdateManualInstitutionDTO updateManualInstitutionDTO) {
    ManualInstitution manualInstitution = manualInstitutionHelper.getByUserAndId(user, id);
    manualInstitution.setName(updateManualInstitutionDTO.getName());
    return modelMapper.map(manualInstitutionRepository.save(manualInstitution),
        ManualInstitutionResponseDTO.class);
  }

  @Override
  public void deleteManualInstitution(User user, Long id) {
    ManualInstitution manualInstitution = manualInstitutionHelper.getByUserAndId(user, id);
    manualInstitutionRepository.delete(manualInstitution);
  }
}

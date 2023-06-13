package com.backend.budgetboss.manualinstitution;

import com.backend.budgetboss.manualinstitution.dto.ManualInstitutionResponseDTO;
import com.backend.budgetboss.manualinstitution.dto.UpdateManualInstitutionDTO;
import com.backend.budgetboss.manualinstitution.helper.ManualInstitutionHelper;
import com.backend.budgetboss.user.User;
import com.backend.budgetboss.user.helper.UserHelper;
import java.util.List;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class ManualInstitutionServiceImpl implements ManualInstitutionService {

  private final ManualInstitutionRepository manualInstitutionRepository;
  private final ManualInstitutionHelper manualInstitutionHelper;
  private final UserHelper userHelper;
  private final ModelMapper modelMapper;

  public ManualInstitutionServiceImpl(ManualInstitutionRepository manualInstitutionRepository,
      ManualInstitutionHelper manualInstitutionHelper,
      UserHelper userHelper,
      ModelMapper modelMapper) {
    this.manualInstitutionRepository = manualInstitutionRepository;
    this.manualInstitutionHelper = manualInstitutionHelper;
    this.userHelper = userHelper;
    this.modelMapper = modelMapper;
  }

  @Override
  public List<ManualInstitutionResponseDTO> getManualInstitutions() {
    return manualInstitutionRepository.findByUser(userHelper.getUser())
        .stream()
        .map(manualInstitution -> modelMapper.map(manualInstitution,
            ManualInstitutionResponseDTO.class))
        .toList();
  }

  @Override
  public ManualInstitutionResponseDTO updateManualInstitution(Long id,
      UpdateManualInstitutionDTO updateManualInstitutionDTO) {
    User user = userHelper.getUser();
    ManualInstitution manualInstitution = manualInstitutionHelper.getManualInstitution(id);

    manualInstitutionHelper.assertManualInstitutionOwnership(user, manualInstitution);
    manualInstitution.setName(updateManualInstitutionDTO.getName());
    return modelMapper.map(manualInstitutionRepository.save(manualInstitution),
        ManualInstitutionResponseDTO.class);
  }

  @Override
  public void deleteManualInstitution(Long id) {
    User user = userHelper.getUser();
    ManualInstitution manualInstitution = manualInstitutionHelper.getManualInstitution(id);

    manualInstitutionHelper.assertManualInstitutionOwnership(user, manualInstitution);
    manualInstitutionRepository.delete(manualInstitution);
  }
}

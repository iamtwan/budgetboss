package com.backend.budgetboss.manualinstitution;

import com.backend.budgetboss.manualinstitution.dto.ManualInstitutionResponseDTO;
import com.backend.budgetboss.manualinstitution.dto.UpdateManualInstitutionDTO;
import com.backend.budgetboss.user.User;
import java.util.List;

public interface ManualInstitutionService {

  List<ManualInstitutionResponseDTO> getManualInstitutions(User user);

  ManualInstitutionResponseDTO updateManualInstitution(
      User user,
      Long id,
      UpdateManualInstitutionDTO updateManualInstitutionDTO);

  void deleteManualInstitution(User user, Long id);
}

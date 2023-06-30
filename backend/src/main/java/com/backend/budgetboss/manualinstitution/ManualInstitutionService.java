package com.backend.budgetboss.manualinstitution;

import com.backend.budgetboss.manualinstitution.dto.ManualInstitutionResponseDTO;
import com.backend.budgetboss.manualinstitution.dto.UpdateManualInstitutionDTO;

import java.util.List;

public interface ManualInstitutionService {
    List<ManualInstitutionResponseDTO> getManualInstitutions();
    ManualInstitutionResponseDTO updateManualInstitution(Long id, UpdateManualInstitutionDTO updateManualInstitutionDTO);
    void deleteManualInstitution(Long id);
}

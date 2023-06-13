package com.backend.budgetboss.manualinstitution.helper;

import com.backend.budgetboss.manualinstitution.ManualInstitution;
import com.backend.budgetboss.manualinstitution.ManualInstitutionRepository;
import com.backend.budgetboss.manualinstitution.exception.ManualInstitutionNotFoundException;
import com.backend.budgetboss.manualinstitution.exception.ManualInstitutionOwnershipException;
import com.backend.budgetboss.user.User;
import java.util.Optional;
import org.springframework.stereotype.Component;

@Component
public class ManualInstitutionHelper {

  private final ManualInstitutionRepository manualInstitutionRepository;

  public ManualInstitutionHelper(ManualInstitutionRepository manualInstitutionRepository) {
    this.manualInstitutionRepository = manualInstitutionRepository;
  }

  public ManualInstitution getManualInstitution(Long id) {
    return manualInstitutionRepository.findById(id)
        .orElseThrow(() -> new ManualInstitutionNotFoundException(
            "Manual Institution not found with id: " + id));
  }

  public Optional<ManualInstitution> getManualInstitutionByUserAndName(User user, String name) {
    return manualInstitutionRepository.findByUserAndName(user, name);
  }

  public void assertManualInstitutionOwnership(User user, ManualInstitution institution) {
    if (!institution.getUser().equals(user)) {
      throw new ManualInstitutionOwnershipException(
          "Manual Institution does not belong to user: " + user.getEmail());
    }
  }
}

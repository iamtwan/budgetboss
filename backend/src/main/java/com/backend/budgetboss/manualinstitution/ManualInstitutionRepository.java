package com.backend.budgetboss.manualinstitution;

import com.backend.budgetboss.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ManualInstitutionRepository extends JpaRepository<ManualInstitution, Long> {
    List<ManualInstitution> findByUser(User user);
    Optional<ManualInstitution> findByUserAndName(User user, String name);
}

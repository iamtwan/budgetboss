package com.backend.budgetboss.manualaccount;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ManualAccountRepository extends JpaRepository<ManualAccount, Long> {

}

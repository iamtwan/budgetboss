package com.backend.budgetboss.manualtransaction;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ManualTransactionRepository extends JpaRepository<ManualTransaction, Long> {
    List<ManualTransaction> findAllByManualAccountId(Long manualAccountId);
}

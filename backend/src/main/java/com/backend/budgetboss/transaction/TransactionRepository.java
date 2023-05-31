package com.backend.budgetboss.transaction;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<TransactionEntity, Long> {

    void deleteAllByTransactionIdIn(List<String> transactionIds);
}

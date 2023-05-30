package com.backend.budgetboss.transaction;

import java.io.IOException;

public interface TransactionService {
    void syncTransactions(Long id) throws IOException;
}

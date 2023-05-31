package com.backend.budgetboss.transaction;

import java.io.IOException;
import java.util.List;

public interface TransactionService {
    void syncTransactions(String itemId) throws IOException;
}

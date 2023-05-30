package com.backend.budgetboss.transaction;

import com.backend.budgetboss.account.Account;
import com.backend.budgetboss.account.util.AccountUtil;
import com.backend.budgetboss.item.Item;
import com.backend.budgetboss.item.util.ItemUtil;
import com.backend.budgetboss.user.User;
import com.backend.budgetboss.user.util.UserUtil;
import com.plaid.client.model.RemovedTransaction;
import com.plaid.client.model.Transaction;
import com.plaid.client.model.TransactionsSyncRequest;
import com.plaid.client.model.TransactionsSyncResponse;
import com.plaid.client.request.PlaidApi;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import retrofit2.Response;

import java.io.IOException;
import java.io.SyncFailedException;
import java.util.ArrayList;
import java.util.List;

@Service
public class TransactionServiceImpl implements TransactionService {
    private final TransactionRepository transactionRepository;
    private final UserUtil userUtil;
    private final ItemUtil itemUtil;
    private final AccountUtil accountUtil;
    private final PlaidApi plaidApi;

    public TransactionServiceImpl(TransactionRepository transactionRepository,
                                  UserUtil userUtil,
                                  ItemUtil itemUtil,
                                  AccountUtil accountUtil,
                                  PlaidApi plaidApi) {
        this.transactionRepository = transactionRepository;
        this.userUtil = userUtil;
        this.itemUtil = itemUtil;
        this.accountUtil = accountUtil;
        this.plaidApi = plaidApi;
    }

    @Override
    @Transactional
    public void syncTransactions(Long id) throws IOException {
        User user = userUtil.getUser();
        Item item = itemUtil.getItem(id);

        itemUtil.assertItemOwnership(user, item);

        String cursor = item.getCursor();

        List<Transaction> added = new ArrayList<>();
        List<Transaction> modified = new ArrayList<>();
        List<RemovedTransaction> removed = new ArrayList<>();

        boolean hasMore = true;

        while (hasMore) {
            TransactionsSyncRequest request = new TransactionsSyncRequest()
                    .accessToken(item.getAccessToken())
                    .cursor(cursor);

            Response<TransactionsSyncResponse> response = plaidApi
                    .transactionsSync(request)
                    .execute();

            if (!response.isSuccessful() || response.body() == null) {
                throw new SyncFailedException("Unable to sync transactions for item: " + item.getId());
            }

            added.addAll(response.body().getAdded());
            modified.addAll(response.body().getModified());
            removed.addAll(response.body().getRemoved());

            hasMore = response.body().getHasMore();
            cursor = response.body().getNextCursor();
        }

        item.setCursor(cursor);

        for (RemovedTransaction transaction : removed) {
            transactionRepository.deleteByTransactionId(transaction.getTransactionId());
        }

        for (Transaction transaction : added) {
            Account account = accountUtil.getAccount(transaction.getAccountId());
            transactionRepository.save(new TransactionEntity(transaction, account));
        }

        for (Transaction transaction : modified) {
            Account account = accountUtil.getAccount(transaction.getAccountId());
            transactionRepository.save(new TransactionEntity(transaction, account));
        }
    }
}

package com.backend.budgetboss.transaction;

import com.backend.budgetboss.account.Account;
import com.backend.budgetboss.account.util.AccountUtil;
import com.backend.budgetboss.item.Item;
import com.backend.budgetboss.item.util.ItemUtil;
import com.backend.budgetboss.transaction.dto.TransactionResponseDTO;
import com.backend.budgetboss.user.User;
import com.backend.budgetboss.user.util.UserUtil;
import com.plaid.client.model.RemovedTransaction;
import com.plaid.client.model.Transaction;
import com.plaid.client.model.TransactionsSyncRequest;
import com.plaid.client.model.TransactionsSyncResponse;
import com.plaid.client.request.PlaidApi;
import org.modelmapper.ModelMapper;
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
    private final ModelMapper modelMapper;

    public TransactionServiceImpl(TransactionRepository transactionRepository,
                                  UserUtil userUtil,
                                  ItemUtil itemUtil,
                                  AccountUtil accountUtil,
                                  PlaidApi plaidApi, ModelMapper modelMapper) {
        this.transactionRepository = transactionRepository;
        this.userUtil = userUtil;
        this.itemUtil = itemUtil;
        this.accountUtil = accountUtil;
        this.plaidApi = plaidApi;
        this.modelMapper = modelMapper;
    }

    @Override
    @Transactional
    public void syncTransactions(String itemId) throws IOException {
        Item item = itemUtil.getItemByItemId(itemId);

        String cursor = item.getCursor();

        List<Transaction> addedAndModified = new ArrayList<>();
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

            addedAndModified.addAll(response.body().getAdded());
            addedAndModified.addAll(response.body().getModified());
            removed.addAll(response.body().getRemoved());

            hasMore = response.body().getHasMore();
            cursor = response.body().getNextCursor();
        }

        item.setCursor(cursor);

        List<String> transactionIds = new ArrayList<>();
        List<TransactionEntity> transactionEntities = new ArrayList<>();

        for (RemovedTransaction transaction : removed) {
            transactionIds.add(transaction.getTransactionId());
        }

        for (Transaction transaction : addedAndModified) {
            Account account = accountUtil.getAccountByAccountId(transaction.getAccountId());
            transactionEntities.add(new TransactionEntity(transaction, account));
        }

        transactionRepository.deleteAllByTransactionIdIn(transactionIds);
        transactionRepository.saveAll(transactionEntities);
    }

    @Override
    public List<TransactionResponseDTO> getTransactionsByAccountId(Long id) {
        User user = userUtil.getUser();
        Account account = accountUtil.getAccount(id);

        accountUtil.assertAccountOwnership(user, account);

        List<TransactionEntity> transactions = transactionRepository.findAllByAccount(account);
        List<TransactionResponseDTO> transactionResponseDTOS = new ArrayList<>();

        for (TransactionEntity transaction : transactions) {
            transactionResponseDTOS.add(modelMapper.map(transaction, TransactionResponseDTO.class));
        }

        return transactionResponseDTOS;
    }
}

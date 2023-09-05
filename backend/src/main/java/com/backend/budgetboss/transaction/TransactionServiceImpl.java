package com.backend.budgetboss.transaction;

import com.backend.budgetboss.account.Account;
import com.backend.budgetboss.account.AccountService;
import com.backend.budgetboss.account.helper.AccountHelper;
import com.backend.budgetboss.item.Item;
import com.backend.budgetboss.transaction.dto.TransactionResponseDTO;
import com.backend.budgetboss.user.User;
import com.plaid.client.model.RemovedTransaction;
import com.plaid.client.model.Transaction;
import com.plaid.client.model.TransactionsSyncRequest;
import com.plaid.client.model.TransactionsSyncRequestOptions;
import com.plaid.client.model.TransactionsSyncResponse;
import com.plaid.client.request.PlaidApi;
import java.io.IOException;
import java.io.SyncFailedException;
import java.util.ArrayList;
import java.util.List;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import retrofit2.Response;

@Service
public class TransactionServiceImpl implements TransactionService {

  private final Logger logger = LoggerFactory.getLogger(TransactionServiceImpl.class);
  private final TransactionRepository transactionRepository;
  private final AccountHelper accountHelper;
  private final AccountService accountService;
  private final PlaidApi plaidApi;
  private final ModelMapper modelMapper;

  public TransactionServiceImpl(TransactionRepository transactionRepository,
      AccountHelper accountHelper,
      AccountService accountService,
      PlaidApi plaidApi,
      ModelMapper modelMapper) {
    this.transactionRepository = transactionRepository;
    this.accountHelper = accountHelper;
    this.accountService = accountService;
    this.plaidApi = plaidApi;
    this.modelMapper = modelMapper;
  }

  @Override
  @Transactional
  @Retryable(retryFor = SyncFailedException.class)
  public void syncTransactions(Item item) throws IOException {
    accountService.createAccounts(item);

    String cursor = item.getPlaidCursor();

    List<Transaction> added = new ArrayList<>();
    List<Transaction> modified = new ArrayList<>();
    List<RemovedTransaction> removed = new ArrayList<>();

    boolean hasMore = true;

    TransactionsSyncRequestOptions options = new TransactionsSyncRequestOptions()
        .includePersonalFinanceCategory(true);

    while (hasMore) {
      TransactionsSyncRequest request = new TransactionsSyncRequest()
          .accessToken(item.getAccessToken())
          .cursor(cursor)
          .options(options);

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

    item.setPlaidCursor(cursor);

    List<String> transactionIds = new ArrayList<>();
    List<TransactionEntity> transactionEntities = new ArrayList<>();

    for (RemovedTransaction transaction : removed) {
      transactionIds.add(transaction.getTransactionId());
    }

    for (Transaction transaction : added) {
      Account account = accountHelper.getAccountByAccountId(transaction.getAccountId());
      transactionEntities.add(new TransactionEntity(transaction, account));
    }

    for (Transaction transaction : modified) {
      Account account = accountHelper.getAccountByAccountId(transaction.getAccountId());

      TransactionEntity existingTransaction = transactionRepository
          .findByTransactionId(transaction.getTransactionId())
          .orElse(new TransactionEntity(transaction, account));

      transactionEntities.add(existingTransaction);
    }

    transactionRepository.deleteAllByTransactionIdIn(transactionIds);
    transactionRepository.saveAll(transactionEntities);

    logger.info("Deleted {} transactions, Added {} transactions, Modified {} transactions",
        transactionIds.size(), added.size(), modified.size());
  }

  @Override
  public List<TransactionResponseDTO> getTransactionsByAccountId(User user, Long id) {
    Account account = accountHelper.getAccountByUserAndId(user, id);

    List<TransactionEntity> transactions = transactionRepository.findAllByAccount(account);
    List<TransactionResponseDTO> transactionResponseDTOS = new ArrayList<>();

    for (TransactionEntity transaction : transactions) {
      transactionResponseDTOS.add(modelMapper.map(transaction, TransactionResponseDTO.class));
    }

    return transactionResponseDTOS;
  }
}

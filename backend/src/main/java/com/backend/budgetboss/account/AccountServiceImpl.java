package com.backend.budgetboss.account;

import com.backend.budgetboss.account.exception.AccountRequestException;
import com.backend.budgetboss.item.Item;
import com.backend.budgetboss.item.ItemRepository;
import com.plaid.client.model.AccountBase;
import com.plaid.client.model.AccountsGetRequest;
import com.plaid.client.model.AccountsGetResponse;
import com.plaid.client.request.PlaidApi;
import java.io.IOException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import retrofit2.Response;

@Service
public class AccountServiceImpl implements AccountService {

  private final AccountRepository accountRepository;
  private final ItemRepository itemRepository;
  private final PlaidApi plaidApi;
  private final ModelMapper modelMapper;

  public AccountServiceImpl(AccountRepository accountRepository,
      ItemRepository itemRepository,
      PlaidApi plaidApi,
      ModelMapper modelMapper) {
    this.accountRepository = accountRepository;
    this.itemRepository = itemRepository;
    this.plaidApi = plaidApi;
    this.modelMapper = modelMapper;
  }

  @Override
  @Transactional
  public void createAccounts(Item item) throws IOException {
    AccountsGetRequest request = new AccountsGetRequest().accessToken(item.getAccessToken());

    Response<AccountsGetResponse> response = plaidApi.accountsGet(request).execute();

    if (!response.isSuccessful() || response.body() == null) {
      throw new AccountRequestException("Unable to retrieve accounts for item: " + item.getId());
    }

    item.getAccounts().clear();

    for (AccountBase accountBase : response.body().getAccounts()) {
      Account account = accountRepository.findByAccountId(accountBase.getAccountId())
          .orElse(new Account(item));
      modelMapper.map(accountBase, account);
      item.getAccounts().add(account);
    }

    itemRepository.save(item);
  }
}

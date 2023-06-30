package com.backend.budgetboss.account;

import com.backend.budgetboss.account.exception.AccountRequestException;
import com.backend.budgetboss.item.Item;
import com.backend.budgetboss.item.helper.ItemHelper;
import com.plaid.client.model.AccountsGetRequest;
import com.plaid.client.model.AccountsGetResponse;
import com.plaid.client.request.PlaidApi;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import retrofit2.Response;

import java.io.IOException;
import java.util.List;

@Service
public class AccountServiceImpl implements AccountService {
    private final AccountRepository accountRepository;
    private final ItemHelper itemHelper;
    private final PlaidApi plaidApi;

    public AccountServiceImpl(AccountRepository accountRepository,
                              ItemHelper itemHelper,
                              PlaidApi plaidApi) {
        this.accountRepository = accountRepository;
        this.itemHelper = itemHelper;
        this.plaidApi = plaidApi;
    }

    @Override
    @Transactional
    public void createAccounts(Long id) throws IOException {
        Item item = itemHelper.getItem(id);

        AccountsGetRequest request = new AccountsGetRequest()
                .accessToken(item.getAccessToken());

        Response<AccountsGetResponse> response = plaidApi.accountsGet(request).execute();

        if (!response.isSuccessful() || response.body() == null) {
            throw new AccountRequestException("Unable to retrieve accounts for item: " + item.getId());
        }

        List<Account> accounts = response.body().getAccounts()
                .stream()
                .map(accountBase -> new Account(accountBase, item))
                .toList();

        accountRepository.saveAll(accounts);
    }
}

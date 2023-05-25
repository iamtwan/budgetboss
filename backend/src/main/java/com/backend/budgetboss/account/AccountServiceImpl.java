package com.backend.budgetboss.account;

import com.backend.budgetboss.account.dto.PublicTokenDTO;
import com.backend.budgetboss.account.exception.TokenCreationException;
import com.backend.budgetboss.user.User;
import com.backend.budgetboss.user.util.UserUtil;
import com.plaid.client.model.*;
import com.plaid.client.request.PlaidApi;
import retrofit2.Response;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class AccountServiceImpl implements AccountService {
    private final AccountRepository accountRepository;
    private final UserUtil userUtil;
    private final PlaidApi plaidApi;

    public AccountServiceImpl(AccountRepository accountRepository, UserUtil userUtil, PlaidApi plaidApi) {
        this.accountRepository = accountRepository;
        this.userUtil = userUtil;
        this.plaidApi = plaidApi;
    }

    @Override
    public List<Account> getAllAccounts() {
        User user = userUtil.getUser();

        List<Account> accounts = accountRepository.findAllByUser(user);
        return accountRepository.findAllByUser(user);
    }

    @Override
    public LinkTokenCreateResponse createLinkToken() throws IOException {
        User user = userUtil.getUser();

        LinkTokenCreateRequestUser requestUser = new LinkTokenCreateRequestUser()
                .clientUserId(String.valueOf(user.getId()));

        LinkTokenCreateRequest request = new LinkTokenCreateRequest()
                .user(requestUser)
                .clientName("Budget Boss")
                .products(List.of(Products.AUTH))
                .countryCodes(List.of(CountryCode.US))
                .language("en");

        Response<LinkTokenCreateResponse> response = plaidApi
                .linkTokenCreate(request)
                .execute();

        if (!response.isSuccessful()) {
            throw new TokenCreationException("Unable to create link token for user: " + user.getEmail());
        }

        return response.body();
    }

    @Override
    public void exchangePublicToken(PublicTokenDTO publicToken) throws IOException {
        User user = userUtil.getUser();

        ItemPublicTokenExchangeRequest request = new ItemPublicTokenExchangeRequest()
                .publicToken(publicToken.getPublicToken());

        Response<ItemPublicTokenExchangeResponse> response = plaidApi
                .itemPublicTokenExchange(request)
                .execute();

        if (!response.isSuccessful()) {
            throw new TokenCreationException("Unable to create link token for user: " + user.getEmail());
        }

        Account account = new Account();
        account.setUser(user);
        account.setAccessToken(response.body().getAccessToken());
        account.setItemId(response.body().getItemId());

        accountRepository.save(account);
    }


}

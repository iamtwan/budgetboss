package com.backend.budgetboss.account;

import com.backend.budgetboss.account.dto.PublicTokenDTO;
import com.plaid.client.model.LinkTokenCreateResponse;

import java.io.IOException;
import java.util.List;

public interface AccountService {
    List<Account> getAllAccounts();
    LinkTokenCreateResponse createLinkToken() throws IOException;
    void exchangePublicToken(PublicTokenDTO publicToken) throws IOException;
}

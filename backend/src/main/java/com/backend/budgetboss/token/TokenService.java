package com.backend.budgetboss.token;

import com.plaid.client.model.LinkTokenCreateResponse;

import java.io.IOException;

public interface TokenService {
    LinkTokenCreateResponse createLinkToken() throws IOException;
    LinkTokenCreateResponse createLinkToken(Long id) throws IOException;
    void exchangePublicToken(Token token) throws IOException;
}

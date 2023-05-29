package com.backend.budgetboss.token;

import com.backend.budgetboss.token.dto.PublicTokenDTO;
import com.plaid.client.model.LinkTokenCreateResponse;

import java.io.IOException;

public interface TokenService {
    LinkTokenCreateResponse createLinkToken() throws IOException;

    void exchangePublicToken(Token token) throws IOException;
}

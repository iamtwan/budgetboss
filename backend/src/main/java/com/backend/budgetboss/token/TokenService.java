package com.backend.budgetboss.token;

import com.backend.budgetboss.user.User;
import com.plaid.client.model.LinkTokenCreateResponse;
import java.io.IOException;

public interface TokenService {

  LinkTokenCreateResponse createLinkToken(User user) throws IOException;

  LinkTokenCreateResponse createLinkToken(User user, Long id) throws IOException;

  void exchangePublicToken(User user, Token token) throws IOException;
}

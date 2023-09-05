package com.backend.budgetboss.token;

import com.backend.budgetboss.item.Item;
import com.backend.budgetboss.item.ItemRepository;
import com.backend.budgetboss.item.helper.ItemHelper;
import com.backend.budgetboss.token.exception.TokenCreationException;
import com.backend.budgetboss.transaction.TransactionService;
import com.backend.budgetboss.user.User;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.plaid.client.model.CountryCode;
import com.plaid.client.model.ItemPublicTokenExchangeRequest;
import com.plaid.client.model.ItemPublicTokenExchangeResponse;
import com.plaid.client.model.LinkTokenCreateRequest;
import com.plaid.client.model.LinkTokenCreateRequestUpdate;
import com.plaid.client.model.LinkTokenCreateRequestUser;
import com.plaid.client.model.LinkTokenCreateResponse;
import com.plaid.client.model.Products;
import com.plaid.client.request.PlaidApi;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import retrofit2.Response;

@Service
public class TokenServiceImpl implements TokenService {

  private final ItemHelper itemHelper;
  private final ItemRepository itemRepository;
  private final TransactionService transactionService;
  private final PlaidApi plaidApi;

  @Value("${BASE_URL}")
  private String baseUrl;

  @Value("${FRONTEND_URL}")
  private String frontendUrl;

  @Value("${IS_PRODUCTION}")
  private boolean isProduction;

  public TokenServiceImpl(ItemHelper itemHelper,
      ItemRepository itemRepository,
      TransactionService transactionService,
      PlaidApi plaidApi) {
    this.itemHelper = itemHelper;
    this.itemRepository = itemRepository;
    this.transactionService = transactionService;
    this.plaidApi = plaidApi;
  }

  @Override
  public LinkTokenCreateResponse createLinkToken(User user) throws IOException {
    return createLink(user, null);
  }

  @Override
  public LinkTokenCreateResponse createLinkToken(User user, Long id) throws IOException {
    return createLink(user, itemHelper.getItem(user, id));
  }

  public LinkTokenCreateResponse createLink(User user, Item item) throws IOException {
    String accessToken = null;
    List<Products> products = List.of(Products.TRANSACTIONS);
    LinkTokenCreateRequestUpdate update = new LinkTokenCreateRequestUpdate();

    if (item != null) {
      accessToken = item.getAccessToken();
      products = new ArrayList<>();
      update.setAccountSelectionEnabled(true);
    }

    String publicUrl = baseUrl;

    if (!isProduction) {
      RestTemplate restTemplate = new RestTemplate();
      String ngrokApiUrl = "http://localhost:4040/api/tunnels";
      ResponseEntity<String> ngrokResponse = restTemplate.getForEntity(ngrokApiUrl, String.class);

      ObjectMapper objectMapper = new ObjectMapper();
      JsonNode root = objectMapper.readTree(ngrokResponse.getBody());
      JsonNode tunnelsNode = root.path("tunnels");

      for (JsonNode tunnelNode : tunnelsNode) {
        JsonNode publicUrlNode = tunnelNode.path("public_url");
        publicUrl = publicUrlNode.asText();
        break;
      }
    }

    LinkTokenCreateRequestUser requestUser = new LinkTokenCreateRequestUser()
        .clientUserId(String.valueOf(user.getId()));

    LinkTokenCreateRequest request = new LinkTokenCreateRequest()
        .clientId("6438697aab53b0001409298d")
        .secret("1486f87546527c19d79d25cf00f034")
        .user(requestUser)
        .clientName("Budget Boss")
        .products(products)
        .countryCodes(List.of(CountryCode.US))
        .language("en")
        .redirectUri(frontendUrl + "/oauth")
        .webhook(publicUrl + "/api/webhooks")
        .accessToken(accessToken)
        .linkCustomizationName("budgetboss")
        .update(update);

    Response<LinkTokenCreateResponse> response = plaidApi
        .linkTokenCreate(request)
        .execute();

    if (!response.isSuccessful()) {
      System.out.println(response.errorBody().string());
      throw new TokenCreationException("Unable to create link token for user: " + user.getEmail());
    }

    return response.body();
  }

  @Override
  @Transactional
  public void exchangePublicToken(User user, Token token) throws IOException {
    if (itemRepository.existsByUserAndInstitutionId(user, token.getId())) {
      throw new TokenCreationException("Duplicate institution found for id: " + token.getId());
    }

    ItemPublicTokenExchangeRequest request = new ItemPublicTokenExchangeRequest()
        .publicToken(token.getPublicToken());

    Response<ItemPublicTokenExchangeResponse> response = plaidApi
        .itemPublicTokenExchange(request)
        .execute();

    if (!response.isSuccessful() || response.body() == null) {
      throw new TokenCreationException("Unable to create link token for user: " + user.getEmail());
    }

    Item item = new Item();
    item.setUser(user);
    item.setAccessToken(response.body().getAccessToken());
    item.setItemId(response.body().getItemId());
    item.setInstitutionId(token.getId());
    item.setInstitutionName(token.getName());

    itemRepository.save(item);
    transactionService.syncTransactions(item);
  }
}

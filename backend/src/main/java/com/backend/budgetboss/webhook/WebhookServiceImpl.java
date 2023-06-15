package com.backend.budgetboss.webhook;

import com.backend.budgetboss.item.Item;
import com.backend.budgetboss.item.helper.ItemHelper;
import com.backend.budgetboss.transaction.TransactionService;
import com.backend.budgetboss.user.User;
import com.backend.budgetboss.webhook.exception.FireWebhookException;
import com.backend.budgetboss.webhook.exception.ResetLoginException;
import com.backend.budgetboss.webhook.helper.WebhookItemHelper;
import com.google.gson.Gson;
import com.plaid.client.model.ItemErrorWebhook;
import com.plaid.client.model.SandboxItemFireWebhookRequest;
import com.plaid.client.model.SandboxItemFireWebhookResponse;
import com.plaid.client.model.SandboxItemResetLoginRequest;
import com.plaid.client.model.SandboxItemResetLoginResponse;
import com.plaid.client.request.PlaidApi;
import java.io.IOException;
import java.util.Map;
import org.springframework.stereotype.Service;
import retrofit2.Response;

@Service
public class WebhookServiceImpl implements WebhookService {

  private final ItemHelper itemHelper;
  private final WebhookItemHelper webhookItemHelper;
  private final TransactionService transactionService;
  private final PlaidApi plaidApi;
  private final Gson gson;

  public WebhookServiceImpl(ItemHelper itemHelper,
      WebhookItemHelper webhookItemHelper,
      TransactionService transactionService,
      PlaidApi plaidApi,
      Gson gson) {
    this.itemHelper = itemHelper;
    this.webhookItemHelper = webhookItemHelper;
    this.transactionService = transactionService;
    this.plaidApi = plaidApi;
    this.gson = gson;
  }

  @Override
  public void fireItemWebhook(User user, Long id) throws IOException {
    Item item = itemHelper.getItem(user, id);

    SandboxItemFireWebhookRequest request = new SandboxItemFireWebhookRequest()
        .accessToken(item.getAccessToken())
        .webhookCode(SandboxItemFireWebhookRequest.WebhookCodeEnum.NEW_ACCOUNTS_AVAILABLE);

    Response<SandboxItemFireWebhookResponse> response = plaidApi
        .sandboxItemFireWebhook(request)
        .execute();

    if (!response.isSuccessful()) {
      throw new FireWebhookException("Unable to fire webhook for item: " + item.getId());
    }
  }

  @Override
  public void resetLoginWebhook(User user, Long id) throws IOException {
    Item item = itemHelper.getItem(user, id);

    SandboxItemResetLoginRequest request = new SandboxItemResetLoginRequest()
        .accessToken(item.getAccessToken());

    Response<SandboxItemResetLoginResponse> response = plaidApi
        .sandboxItemResetLogin(request)
        .execute();

    if (!response.isSuccessful()) {
      throw new ResetLoginException("Unable to reset login for item: " + item.getId());
    }
  }

  @Override
  public void handleItemWebhook(Map<String, Object> event) {
    String code = (String) event.get("webhook_code");
    String id = (String) event.get("item_id");

    switch (code) {
      case "ERROR":
        ItemErrorWebhook error = gson.fromJson(gson.toJson(event), ItemErrorWebhook.class);
        webhookItemHelper.handleError(error);
        break;
      case "PENDING EXPIRATION":
        webhookItemHelper.handlePendingExpiration(id);
        break;
      case "USER_PERMISSION_REVOKED":
        webhookItemHelper.handleUserPermissionRevoked(id);
        break;
      case "NEW_ACCOUNTS_AVAILABLE":
      case "WEBHOOK_UPDATE_ACKNOWLEDGED":
        break;
      default:
        System.out.println("Unknown webhook code: " + code);
    }
  }

  @Override
  public void handleTransactionsWebhook(Map<String, Object> event) throws IOException {
    String code = (String) event.get("webhook_code");
    String id = (String) event.get("item_id");

    switch (code) {
      case "SYNC_UPDATES_AVAILABLE":
        transactionService.syncTransactions(id);
        break;
      case "INITIAL_UPDATE":
      case "HISTORICAL_UPDATE":
      case "DEFAULT_UPDATE":
      case "TRANSACTIONS_REMOVED":
        // ignore - not needed when using sync
        break;
      default:
        System.out.println("Unknown webhook code: " + code);
    }
  }
}

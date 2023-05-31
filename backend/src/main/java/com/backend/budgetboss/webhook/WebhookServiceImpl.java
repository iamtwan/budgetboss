package com.backend.budgetboss.webhook;

import com.backend.budgetboss.item.Item;
import com.backend.budgetboss.item.exception.ItemDoesNotBelongToUserException;
import com.backend.budgetboss.item.util.ItemUtil;
import com.backend.budgetboss.transaction.TransactionService;
import com.backend.budgetboss.user.User;
import com.backend.budgetboss.user.util.UserUtil;
import com.backend.budgetboss.webhook.exception.FireWebhookException;
import com.backend.budgetboss.webhook.exception.ResetLoginException;
import com.plaid.client.model.SandboxItemFireWebhookRequest;
import com.plaid.client.model.SandboxItemFireWebhookResponse;
import com.plaid.client.model.SandboxItemResetLoginRequest;
import com.plaid.client.model.SandboxItemResetLoginResponse;
import com.plaid.client.request.PlaidApi;
import org.springframework.stereotype.Service;
import retrofit2.Response;

import java.io.IOException;
import java.util.Map;

@Service
public class WebhookServiceImpl implements WebhookService {
    private final UserUtil userUtil;
    private final ItemUtil itemUtil;
    private final TransactionService transactionService;
    private final PlaidApi plaidApi;

    public WebhookServiceImpl(UserUtil userUtil,
                              ItemUtil itemUtil,
                              TransactionService transactionService,
                              PlaidApi plaidApi) {
        this.userUtil = userUtil;
        this.itemUtil = itemUtil;
        this.transactionService = transactionService;
        this.plaidApi = plaidApi;
    }


    @Override
    public void fireItemWebhook(Long id) throws IOException {
        User user = userUtil.getUser();
        Item item = itemUtil.getItem(id);

        itemUtil.assertItemOwnership(user, item);

        SandboxItemFireWebhookRequest request = new SandboxItemFireWebhookRequest()
                .accessToken(item.getAccessToken())
                .webhookCode(SandboxItemFireWebhookRequest.WebhookCodeEnum.ERROR);

        Response<SandboxItemFireWebhookResponse> response = plaidApi
                .sandboxItemFireWebhook(request)
                .execute();

        if (!response.isSuccessful()) {
            throw new FireWebhookException("Unable to fire webhook for item: " + item.getId());
        }
    }

    @Override
    public void resetLoginWebhook(Long id) throws IOException {
        User user = userUtil.getUser();
        Item item = itemUtil.getItem(id);

        if (!item.getUser().equals(user)) {
            throw new ItemDoesNotBelongToUserException("Item does not belong to user: " + user.getEmail());
        }

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
        System.out.println(event);
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

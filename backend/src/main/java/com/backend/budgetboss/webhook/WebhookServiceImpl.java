package com.backend.budgetboss.webhook;

import com.backend.budgetboss.item.Item;
import com.backend.budgetboss.item.exception.ItemDoesNotBelongToUserException;
import com.backend.budgetboss.item.util.ItemUtil;
import com.backend.budgetboss.user.User;
import com.backend.budgetboss.user.util.UserUtil;
import com.backend.budgetboss.webhook.exception.FireWebhookException;
import com.plaid.client.model.SandboxItemFireWebhookRequest;
import com.plaid.client.model.SandboxItemFireWebhookResponse;
import com.plaid.client.request.PlaidApi;
import org.springframework.stereotype.Service;
import retrofit2.Response;

import java.io.IOException;
import java.util.Map;

@Service
public class WebhookServiceImpl implements WebhookService {
    private final UserUtil userUtil;
    private final ItemUtil itemUtil;
    private final PlaidApi plaidApi;

    public WebhookServiceImpl(UserUtil userUtil, ItemUtil itemUtil, PlaidApi plaidApi) {
        this.userUtil = userUtil;
        this.itemUtil = itemUtil;
        this.plaidApi = plaidApi;
    }

    @Override
    public void fireItemWebhook(Long id) throws IOException {
        User user = userUtil.getUser();
        Item item = itemUtil.getItem(id);

        if (!item.getUser().equals(user)) {
            throw new ItemDoesNotBelongToUserException("Item does not belong to user: " + user.getEmail());
        }

        SandboxItemFireWebhookRequest request = new SandboxItemFireWebhookRequest()
                .accessToken(item.getAccessToken())
                .webhookCode(SandboxItemFireWebhookRequest.WebhookCodeEnum.DEFAULT_UPDATE);

        Response<SandboxItemFireWebhookResponse> response = plaidApi
                .sandboxItemFireWebhook(request)
                .execute();

        if (!response.isSuccessful()) {
            throw new FireWebhookException("Unable to fire webhook for item: " + item.getId());
        }
    }

    @Override
    public void handleTransactionsWebhook(Map<String, String> event) {

    }

    @Override
    public void handleItemWebhook(Map<String, String> event) {

    }
}

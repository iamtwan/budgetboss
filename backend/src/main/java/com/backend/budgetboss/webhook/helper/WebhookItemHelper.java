package com.backend.budgetboss.webhook.helper;

import com.backend.budgetboss.item.Item;
import com.backend.budgetboss.item.ItemRepository;
import com.backend.budgetboss.item.Status;
import com.backend.budgetboss.item.helper.ItemHelper;
import com.plaid.client.model.ItemErrorWebhook;
import org.springframework.stereotype.Component;

@Component
public class WebhookItemHelper {
    private final ItemRepository itemRepository;
    private final ItemHelper itemHelper;

    public WebhookItemHelper(ItemRepository itemRepository, ItemHelper itemHelper) {
        this.itemRepository = itemRepository;
        this.itemHelper = itemHelper;
    }

    public void handleError(ItemErrorWebhook error) {
        String errorCode = error.getError().getErrorCode();

        if (errorCode.equals("ITEM_LOGIN_REQUIRED")) {
            handlePendingExpiration(error.getItemId());
        } else {
            System.out.println("Unhandled error code: " + errorCode);
        }
    }

    public void handlePendingExpiration(String id) {
        Item item = itemHelper.getItemByItemId(id);
        item.setStatus(Status.BAD);
        itemRepository.save(item);
    }

    public void handleUserPermissionRevoked(String id) {
        itemRepository.deleteByItemId(id);
    }
}

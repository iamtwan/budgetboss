package com.backend.budgetboss.webhook.helper;

import com.backend.budgetboss.item.Item;
import com.backend.budgetboss.item.ItemRepository;
import com.backend.budgetboss.item.Status;
import com.backend.budgetboss.item.helper.ItemHelper;
import com.plaid.client.model.ItemErrorWebhook;
import com.plaid.client.model.PlaidError;
import org.springframework.stereotype.Component;

@Component
public class WebhookItemHelper {

  private final ItemRepository itemRepository;

  public WebhookItemHelper(ItemRepository itemRepository) {
    this.itemRepository = itemRepository;
  }

  public void handleError(PlaidError error, Item item) {
    String errorCode = error.getErrorCode();

    if (errorCode.equals("ITEM_LOGIN_REQUIRED")) {
      handlePendingExpiration(item);
    } else {
      System.out.println("Unhandled error code: " + errorCode);
    }
  }

  public void handlePendingExpiration(Item item) {
    item.setStatus(Status.BAD);
    itemRepository.save(item);
  }

  public void handleUserPermissionRevoked(Item item) {
    itemRepository.delete(item);
  }
}

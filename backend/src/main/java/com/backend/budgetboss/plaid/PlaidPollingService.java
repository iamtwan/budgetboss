package com.backend.budgetboss.plaid;

import com.backend.budgetboss.item.Item;
import com.backend.budgetboss.item.ItemRepository;
import com.backend.budgetboss.item.Status;
import com.plaid.client.model.ItemGetRequest;
import com.plaid.client.model.ItemGetResponse;
import com.plaid.client.request.PlaidApi;
import java.io.IOException;
import java.util.List;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import retrofit2.Response;

@Service
public class PlaidPollingService {

  private final ItemRepository itemRepository;
  private final PlaidApi plaidApi;

  public PlaidPollingService(ItemRepository itemRepository, PlaidApi plaidApi) {
    this.itemRepository = itemRepository;
    this.plaidApi = plaidApi;
  }

  @Scheduled(fixedRate = 24 * 60 * 60 * 1000) // 1 day
  public void pollPlaidForUpdates() throws IOException {
    List<Item> items = itemRepository.findAll();

    for (Item item : items) {
      ItemGetRequest request = new ItemGetRequest().accessToken(item.getAccessToken());
      Response<ItemGetResponse> response = plaidApi.itemGet(request).execute();
      item.setStatus(response.isSuccessful() ? Status.GOOD : Status.BAD);
      itemRepository.save(item);
    }
  }
}

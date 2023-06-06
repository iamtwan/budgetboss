package com.backend.budgetboss.plaid;

import com.backend.budgetboss.item.Item;
import com.backend.budgetboss.item.ItemRepository;
import com.plaid.client.request.PlaidApi;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlaidPollingService {
    private final Logger logger = LoggerFactory.getLogger(PlaidPollingService.class);
    private final ItemRepository itemRepository;
    private final PlaidApi plaidApi;

    public PlaidPollingService(ItemRepository itemRepository, PlaidApi plaidApi) {
        this.itemRepository = itemRepository;
        this.plaidApi = plaidApi;
    }

    @Scheduled(fixedRate = 24 * 60 * 60 * 1000) // 1 day
    public void pollPlaidForUpdates() {
        List<Item> items = itemRepository.findAll();

        for (Item item : items) {

        }
    }
}

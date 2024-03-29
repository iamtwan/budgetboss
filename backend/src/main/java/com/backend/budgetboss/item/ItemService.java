package com.backend.budgetboss.item;

import com.backend.budgetboss.item.dto.ItemResponseDTO;
import com.backend.budgetboss.user.User;
import java.io.IOException;
import java.util.List;

public interface ItemService {

  List<ItemResponseDTO> getAllItems(User user) throws IOException;

  List<ItemResponseDTO> getItemsByCash(User user, int pageNo, int pageSize);

  void deleteItem(User user, Long itemId) throws IOException;

  void unlinkUser(User user);

}

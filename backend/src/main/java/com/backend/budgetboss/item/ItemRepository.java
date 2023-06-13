package com.backend.budgetboss.item;

import com.backend.budgetboss.user.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

  List<Item> findAllByUser(User user);

  boolean existsByUserAndInstitutionId(User user, String institutionId);

  Optional<Item> findByItemId(String itemId);

  void deleteByItemId(String itemId);
}

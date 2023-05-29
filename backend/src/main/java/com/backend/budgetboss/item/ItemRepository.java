package com.backend.budgetboss.item;

import com.backend.budgetboss.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findAllByUser(User user);
    boolean existsByUserAndInstitutionId(User user, String institutionId);
}

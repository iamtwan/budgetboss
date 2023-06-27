package com.backend.budgetboss.goal;

import com.backend.budgetboss.user.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GoalRepository extends JpaRepository<Goal, Long> {

  Optional<Goal> findByUserAndId(User user, Long id);
}

package com.backend.budgetboss.goal;

import com.backend.budgetboss.goal.dto.CreateGoalDTO;
import com.backend.budgetboss.goal.dto.GoalResponseDTO;
import com.backend.budgetboss.user.User;

public interface GoalService {

  GoalResponseDTO createGoal(User user, CreateGoalDTO createGoalDTO);

  GoalResponseDTO updateGoal(User user, Long id, CreateGoalDTO createGoalDTO);

  void deleteGoal(User user, Long id);
}

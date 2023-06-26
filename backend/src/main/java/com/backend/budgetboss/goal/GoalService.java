package com.backend.budgetboss.goal;

import com.backend.budgetboss.goal.dto.CreateGoalDTO;
import com.backend.budgetboss.user.User;

public interface GoalService {

  Goal createGoal(User user, CreateGoalDTO createGoalDTO);
}

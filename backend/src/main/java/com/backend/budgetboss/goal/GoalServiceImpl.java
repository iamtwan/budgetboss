package com.backend.budgetboss.goal;

import com.backend.budgetboss.goal.dto.CreateGoalDTO;
import com.backend.budgetboss.user.User;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class GoalServiceImpl implements GoalService {

  private final GoalRepository goalRepository;
  private final ModelMapper modelMapper;

  public GoalServiceImpl(GoalRepository goalRepository, ModelMapper modelMapper) {
    this.goalRepository = goalRepository;
    this.modelMapper = modelMapper;
  }

  @Override
  public Goal createGoal(User user, CreateGoalDTO createGoalDTO) {
    return null;
  }
}

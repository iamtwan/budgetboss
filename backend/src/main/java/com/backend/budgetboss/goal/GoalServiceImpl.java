package com.backend.budgetboss.goal;

import com.backend.budgetboss.goal.dto.CreateGoalDTO;
import com.backend.budgetboss.goal.dto.GoalResponseDTO;
import com.backend.budgetboss.goal.exception.GoalNotFoundException;
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
  public GoalResponseDTO createGoal(User user, CreateGoalDTO createGoalDTO) {
    Goal goal = modelMapper.map(createGoalDTO, Goal.class);
    goal.setUser(user);
    return new GoalResponseDTO(goalRepository.save(goal));
  }

  @Override
  public GoalResponseDTO updateGoal(User user, Long id, CreateGoalDTO createGoalDTO) {
    Goal goal = goalRepository.findByUserAndId(user, id)
        .orElseThrow(() -> new GoalNotFoundException(id));
    modelMapper.map(createGoalDTO, goal);
    return new GoalResponseDTO(goalRepository.save(goal));
  }

  @Override
  public void deleteGoal(User user, Long id) {
    Goal goal = goalRepository.findByUserAndId(user, id)
        .orElseThrow(() -> new GoalNotFoundException(id));
    goalRepository.delete(goal);
  }
}

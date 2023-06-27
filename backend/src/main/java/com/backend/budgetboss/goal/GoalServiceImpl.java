package com.backend.budgetboss.goal;

import com.backend.budgetboss.goal.dto.CreateGoalDTO;
import com.backend.budgetboss.goal.dto.GoalResponseDTO;
import com.backend.budgetboss.user.User;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
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
    goalRepository.save(goal);
    return new GoalResponseDTO(goal);
  }
}

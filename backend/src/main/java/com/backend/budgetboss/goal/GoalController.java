package com.backend.budgetboss.goal;

import com.backend.budgetboss.goal.dto.CreateGoalDTO;
import com.backend.budgetboss.user.CurrentUser;
import com.backend.budgetboss.user.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/goals")
@Tag(name = "Goals")
public class GoalController {

  private final Logger logger = LoggerFactory.getLogger(GoalController.class);
  private final GoalService goalService;

  public GoalController(GoalService goalService) {
    this.goalService = goalService;
  }

  @PostMapping
  @Operation(summary = "Create a goal", description = "Create a goal for the current user")
  public ResponseEntity<Goal> createGoal(@CurrentUser User user,
      @Valid @RequestBody CreateGoalDTO createGoalDTO) {
    logger.info("/api/goals POST request received: {}", createGoalDTO);
    Goal goal = goalService.createGoal(user, createGoalDTO);
    logger.info("/api/goals goal created: {}", goal);
    return new ResponseEntity<>(goal, HttpStatus.CREATED);
  }
}

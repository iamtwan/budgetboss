package com.backend.budgetboss.goal;

import com.backend.budgetboss.goal.dto.CreateGoalDTO;
import com.backend.budgetboss.goal.dto.GoalResponseDTO;
import com.backend.budgetboss.user.CurrentUser;
import com.backend.budgetboss.user.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

  @GetMapping
  @Operation(summary = "Get all goals", description = "Get all goals for a user")
  public ResponseEntity<List<GoalResponseDTO>> getGoals(@CurrentUser User user) {
    logger.info("/api/goals GET request received");
    List<GoalResponseDTO> goals = goalService.getGoals(user);
    logger.info("/api/goals got goals: {}", goals.size());
    return ResponseEntity.ok(goals);
  }

  @PostMapping
  @Operation(summary = "Create a goal", description = "Create a goal for the current user")
  public ResponseEntity<GoalResponseDTO> createGoal(@CurrentUser User user,
      @Valid @RequestBody CreateGoalDTO createGoalDTO) {
    logger.info("/api/goals POST request received: {}", createGoalDTO);
    GoalResponseDTO goal = goalService.createGoal(user, createGoalDTO);
    logger.info("/api/goals goal created: {}", goal);
    return new ResponseEntity<>(goal, HttpStatus.CREATED);
  }

  @PutMapping("/{id}")
  @Operation(summary = "Update a goal", description = "Update a goal with the given id")
  public ResponseEntity<GoalResponseDTO> updateGoal(@CurrentUser User user, @PathVariable Long id,
      @Valid @RequestBody CreateGoalDTO createGoalDTO) {
    logger.info("/api/goals/{} PUT request received", id);
    GoalResponseDTO goal = goalService.updateGoal(user, id, createGoalDTO);
    logger.info("/api/goals/{} goal updated: {}", id, goal);
    return ResponseEntity.ok(goal);
  }

  @DeleteMapping("/{id}")
  @Operation(summary = "Delete a goal", description = "Delete a goal with the given id")
  public ResponseEntity<GoalResponseDTO> deleteGoal(@CurrentUser User user, @PathVariable Long id) {
    logger.info("/api/goals/{} DELETE request received", id);
    goalService.deleteGoal(user, id);
    logger.info("/api/goals/{} deleted goal", id);
    return ResponseEntity.noContent().build();
  }
}

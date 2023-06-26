package com.backend.budgetboss.goal;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/goals")
@Tag(name = "Goals")
public class GoalController {

  private final Logger logger = LoggerFactory.getLogger(GoalController.class);

  @PostMapping

}

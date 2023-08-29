package com.backend.budgetboss.global;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "Global")
public class GlobalController {

  @GetMapping("/_ah/start")
  public void ahStartCheck() {

  }
}

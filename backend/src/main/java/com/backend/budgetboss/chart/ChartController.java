package com.backend.budgetboss.chart;

import com.backend.budgetboss.security.UserPrinciple;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.time.Month;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/charts")
@Tag(name = "Charts")
public class ChartController {

  private final Logger logger = LoggerFactory.getLogger(ChartController.class);
  private final ChartService chartService;

  public ChartController(ChartService chartService) {
    this.chartService = chartService;
  }

  @GetMapping("/bar")
  @Operation(summary = "Get the past 6 months of transaction data", description = "Get the past 6 months of transaction data for bar chart")
  public ResponseEntity<List<BarChartResponse>> getBarChartData(
      @AuthenticationPrincipal UserPrinciple principle) {
    logger.info("/api/charts/bar GET request received");
    List<BarChartResponse> charts = chartService.getBarChartData(principle.getUser());
    logger.info("/api/charts/bar got all data: {}", charts.size());
    return ResponseEntity.ok(charts);
  }

  @GetMapping("/bar/{month}")
  @Operation(summary = "Get monthly data", description = "Get the monthly data for the given month")
  public ResponseEntity<BarChartMonthlyResponse> getBarChartMonthlyData(
      @AuthenticationPrincipal UserPrinciple principle,
      @PathVariable Month month) {
    logger.info("/api/charts/bar/{month} GET request received");
    BarChartMonthlyResponse response = chartService
        .getBarChartMonthlyData(principle.getUser(), month);
    logger.info("/api/charts/bar/{month} got data: {}", response);
    return ResponseEntity.ok(response);
  }
}

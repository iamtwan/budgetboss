package com.backend.budgetboss.chart;

import com.backend.budgetboss.security.UserPrinciple;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/charts")
@Tag(name = "Charts")
public class ChartController {
    private final Logger logger = LoggerFactory.getLogger(ChartController.class);
    private final ChartService chartService;

    public ChartController(ChartService chartService) {
        this.chartService = chartService;
    }

    @GetMapping
    @Operation(summary = "Get the past 6 months of transaction data", description = "Get the past 6 months of transaction data")
    public ResponseEntity<List<ChartResponse>> getCharts(@AuthenticationPrincipal UserPrinciple user) {
        logger.info("/api/charts GET request received");
        List<ChartResponse> charts = chartService.getCharts(user.getUser());
        logger.info("/api/charts got all charts: {}", charts.size());
        return ResponseEntity.ok(charts);
    }
}

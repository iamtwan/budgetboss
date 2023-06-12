package com.backend.budgetboss.chart;

import com.backend.budgetboss.user.User;

import java.util.List;

public interface ChartService {
    List<ChartResponse> getCharts(User user);
}

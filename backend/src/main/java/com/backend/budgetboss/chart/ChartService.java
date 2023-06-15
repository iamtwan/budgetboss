package com.backend.budgetboss.chart;

import com.backend.budgetboss.user.User;
import java.time.Month;
import java.util.List;

public interface ChartService {

  List<ChartResponse> getChartData(User user);

  ChartMonthlyResponse getChartMonthlyData(User user, Month month);
}

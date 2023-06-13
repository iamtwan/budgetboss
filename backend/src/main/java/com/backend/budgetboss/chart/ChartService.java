package com.backend.budgetboss.chart;

import com.backend.budgetboss.user.User;
import java.time.Month;
import java.util.List;
import java.util.Map;

public interface ChartService {

  List<ChartResponse> getChartData(User user);

  Map<String, ChartTransactionsResponse> getTransactionsForMonth(User user, Month month);
}

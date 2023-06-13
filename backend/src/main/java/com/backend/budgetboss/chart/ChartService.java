package com.backend.budgetboss.chart;

import com.backend.budgetboss.user.User;

import java.time.Month;
import java.util.List;

public interface ChartService {
    List<ChartResponse> getChartData(User user);

	ChartTransactionsResponse getTransactionsForMonth(User user, Month month);
}

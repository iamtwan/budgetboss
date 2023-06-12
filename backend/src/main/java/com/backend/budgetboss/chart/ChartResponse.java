package com.backend.budgetboss.chart;

import java.time.Month;

public class ChartResponse {
    public Month month;
    public Double balance;

    public ChartResponse() {
    }

    public ChartResponse(Month month, Double balance) {
        this.month = month;
        this.balance = balance;
    }

    public Month getMonth() {
        return month;
    }

    public void setMonth(Month month) {
        this.month = month;
    }

    public Double getBalance() {
        return balance;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }

    @Override
    public String toString() {
        return "ChartResponse{" +
                "month=" + month +
                ", balance=" + balance +
                '}';
    }
}

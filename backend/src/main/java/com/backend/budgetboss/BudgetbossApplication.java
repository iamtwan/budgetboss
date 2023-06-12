package com.backend.budgetboss;

import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.retry.annotation.EnableRetry;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
@EnableRabbit
@EnableRetry
@EnableCaching
public class BudgetbossApplication {
	public static void main(String[] args) {
		SpringApplication.run(BudgetbossApplication.class, args);
	}
}

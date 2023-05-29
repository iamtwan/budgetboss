package com.backend.budgetboss;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
public class BudgetbossApplication {
	public static void main(String[] args) {
		SpringApplication.run(BudgetbossApplication.class, args);
	}
}

package com.backend.budgetboss.manualaccount;

public enum ManualAccountType {
    CASH("cash"),
    CREDIT("credit"),
    INVESTMENT("investment");

	private String name;

	ManualAccountType(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	@Override
	public String toString() {
		return name;
	}
}

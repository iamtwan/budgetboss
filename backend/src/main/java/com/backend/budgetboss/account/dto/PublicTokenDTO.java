package com.backend.budgetboss.account.dto;

public class PublicTokenDTO {
    private String publicToken;

    public String getPublicToken() {
        return publicToken;
    }

    public void setPublicToken(String publicToken) {
        this.publicToken = publicToken;
    }

    @Override
    public String toString() {
        return "PublicTokenDTO{" +
                "publicToken='" + publicToken + '\'' +
                '}';
    }
}

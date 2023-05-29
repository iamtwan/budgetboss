package com.backend.budgetboss.item.dto;

import jakarta.validation.constraints.NotBlank;

public class PublicTokenDTO {
    @NotBlank(message = "Public token is required")
    private String publicToken;

    @NotBlank(message = "Institution ID is required")
    private String id;

    @NotBlank(message = "Institution name is required")
    private String name;

    public String getPublicToken() {
        return publicToken;
    }

    public void setPublicToken(String publicToken) {
        this.publicToken = publicToken;
    }

    public String getInstitutionId() {
        return id;
    }

    public void setInstitutionId(String id) {
        this.id = id;
    }

    public String getInstitutionName() {
        return name;
    }

    public void setInstitutionName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "PublicTokenDTO{" +
                "publicToken='" + publicToken + '\'' +
                ", id='" + id + '\'' +
                ", name='" + name + '\'' +
                '}';
    }
}

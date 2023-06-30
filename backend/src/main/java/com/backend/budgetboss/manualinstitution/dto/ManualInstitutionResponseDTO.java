package com.backend.budgetboss.manualinstitution.dto;

import com.backend.budgetboss.manualaccount.dto.ManualAccountResponseDTO;

import java.util.ArrayList;
import java.util.List;

public class ManualInstitutionResponseDTO {
    private Long id;
    private String name;
    private List<ManualAccountResponseDTO> manualAccounts = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<ManualAccountResponseDTO> getManualAccounts() {
        return manualAccounts;
    }

    public void setManualAccounts(List<ManualAccountResponseDTO> manualAccounts) {
        this.manualAccounts = manualAccounts;
    }

    @Override
    public String toString() {
        return "ManualInstitutionResponseDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", manualAccounts=" + manualAccounts.size() +
                '}';
    }
}

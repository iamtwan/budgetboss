package com.backend.budgetboss.manualinstitution;

import com.backend.budgetboss.manualaccount.ManualAccount;
import com.backend.budgetboss.user.User;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "manual_institutions")
public class    ManualInstitution {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "manualInstitution", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ManualAccount> manualAccounts = new ArrayList<>();

    public ManualInstitution() {
    }

    public ManualInstitution(String name, User user) {
        this.name = name;
        this.user = user;
    }

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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<ManualAccount> getManualAccounts() {
        return manualAccounts;
    }

    public void setManualAccounts(List<ManualAccount> manualAccounts) {
        this.manualAccounts = manualAccounts;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ManualInstitution that = (ManualInstitution) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "ManualInstitution{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", user=" + user.getEmail() +
                ", manualAccounts=" + manualAccounts +
                '}';
    }
}

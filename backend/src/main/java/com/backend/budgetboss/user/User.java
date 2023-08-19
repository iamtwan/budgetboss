package com.backend.budgetboss.user;

import com.backend.budgetboss.goal.Goal;
import com.backend.budgetboss.item.Item;
import com.backend.budgetboss.manualinstitution.ManualInstitution;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "users")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank(message = "Email is required")
  private String email;

  @NotBlank(message = "Password is required")
  private String password;

  private boolean verified;

  private String verificationCode;

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Item> items = new ArrayList<>();

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<ManualInstitution> manualInstitutions = new ArrayList<>();

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Goal> goals = new ArrayList<>();

  public User() {}

  public User(User user) {
    this.id = user.id;
    this.email = user.email;
    this.password = user.password;
    this.verified = user.verified;
    this.items = user.items;
    this.manualInstitutions = user.manualInstitutions;
    this.goals = user.goals;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public boolean isVerified() {
    return verified;
  }

  public void setVerified(boolean verified) {
    this.verified = verified;
  }

  public String getVerificationCode() {
    return verificationCode;
  }

  public void setVerificationCode(String verificationCode) {
    this.verificationCode = verificationCode;
  }

  public List<Item> getItems() {
    return items;
  }

  public void setItems(List<Item> items) {
    this.items = items;
  }

  public List<ManualInstitution> getManualInstitutions() {
    return manualInstitutions;
  }

  public void setManualInstitutions(List<ManualInstitution> manualInstitutions) {
    this.manualInstitutions = manualInstitutions;
  }

  public List<Goal> getGoals() {
    return goals;
  }

  public void setGoals(List<Goal> goals) {
    this.goals = goals;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    User user = (User) o;
    return Objects.equals(id, user.id);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id);
  }

  @Override
  public String toString() {
    return "User{" +
        "id=" + id +
        ", email='" + email + '\'' +
        ", password='" + password + '\'' +
        ", verified=" + verified +
        ", verificationCode='" + verificationCode + '\'' +
        ", items=" + items.size() +
        ", manualInstitutions=" + manualInstitutions.size() +
        ", goals=" + goals.size() +
        '}';
  }
}

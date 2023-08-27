package com.backend.budgetboss.user.verification;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@Table(name = "verification_tokens")
public class VerificationToken {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank(message = "Email is required")
  @Column(unique = true)
  private String email;

  @NotBlank(message = "Verification code is required")
  private String token;

  private LocalDateTime expirationDate;

  public VerificationToken() {}

  public VerificationToken(String email) {
    this.email = email;
    this.expirationDate = LocalDateTime.now().plusMinutes(15);
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

  public String getToken() {
    return token;
  }

  public void setToken(String token) {
    this.token = token;
  }

  public LocalDateTime getExpirationDate() {
    return expirationDate;
  }

  public void setExpirationDate(LocalDateTime expirationDate) {
    this.expirationDate = expirationDate;
  }

  @Override
  public String toString() {
    return "VerificationToken{" +
        "id=" + id +
        ", email='" + email + '\'' +
        ", token='" + token + '\'' +
        ", expirationDate=" + expirationDate +
        '}';
  }
}

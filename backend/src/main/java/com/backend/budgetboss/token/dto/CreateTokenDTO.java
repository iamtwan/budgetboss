package com.backend.budgetboss.token.dto;

public class CreateTokenDTO {

  private Long id;

  public Long getItemId() {
    return id;
  }

  public void setItemId(Long id) {
    this.id = id;
  }

  @Override
  public String toString() {
    return "CreateTokenDTO{" +
        "id=" + id +
        '}';
  }
}

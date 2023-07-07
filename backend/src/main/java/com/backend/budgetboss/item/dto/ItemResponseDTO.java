package com.backend.budgetboss.item.dto;

import com.backend.budgetboss.item.Status;

public class ItemResponseDTO {

  private Long id;
  private String name;
  private Status status;

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

  public Status getStatus() {
    return status;
  }

  public void setStatus(Status status) {
    this.status = status;
  }

  @Override
  public String toString() {
    return "ItemResponseDTO{" +
        "id=" + id +
        ", name='" + name + '\'' +
        ", status=" + status +
        '}';
  }
}

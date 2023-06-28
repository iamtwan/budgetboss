package com.backend.budgetboss.event;

public class Event {
  private Long itemId;
  private String type;
  private String message;

  public Long getItemId() {
    return itemId;
  }

  public void setItemId(Long itemId) {
    this.itemId = itemId;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  @Override
  public String toString() {
    return "Event{" +
        "itemId=" + itemId +
        ", type='" + type + '\'' +
        ", message='" + message + '\'' +
        '}';
  }
}

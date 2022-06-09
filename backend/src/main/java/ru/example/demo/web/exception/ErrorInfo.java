package ru.example.demo.web.exception;

import java.io.Serializable;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class ErrorInfo implements Serializable {

  private LocalDateTime timestamp = LocalDateTime.now();
  private String status;
  private String message;

  public ErrorInfo(String status, String message) {
    this.status = status;
    this.message = message;
  }
}

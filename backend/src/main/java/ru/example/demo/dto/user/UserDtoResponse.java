package ru.example.demo.dto.user;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserDtoResponse implements Serializable {

  private Integer id;
  private String name;
  private String email;
  private String roles;

}

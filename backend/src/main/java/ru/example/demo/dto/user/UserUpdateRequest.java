package ru.example.demo.dto.user;

import java.io.Serializable;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
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
public class UserUpdateRequest implements Serializable {

  @NotBlank(message = "Name: must not be empty")
  @Size(min = 5, max = 20, message = "min 5 max 20")
  private String name;

  @Email
  @NotBlank(message = "Email: must not be empty")
  @Size(min = 5, max = 50 , message = "min 5 max 50")
  private String email;

  @NotBlank
  private String roles;

}

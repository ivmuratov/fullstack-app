package ru.example.demo.util;

import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.experimental.UtilityClass;
import ru.example.demo.model.Role;

@UtilityClass
public class RoleUtil {

  public Set<Role> toSet(String roles) {
    return !(roles == null || roles.equals("")) ? Arrays.stream(roles.split(","))
        .map(Role::valueOf)
        .collect(Collectors.toSet()) : Set.of(Role.USER);
  }

  public String toString(Set<Role> roles) {
    return roles.stream()
        .sorted()
        .map(Enum::name)
        .collect(Collectors.joining(","));
  }
}

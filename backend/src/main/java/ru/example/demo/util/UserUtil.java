package ru.example.demo.util;

import java.util.Set;
import lombok.experimental.UtilityClass;
import org.springframework.security.crypto.password.PasswordEncoder;
import ru.example.demo.dto.user.UserCreateRequest;
import ru.example.demo.dto.user.UserDtoResponse;
import ru.example.demo.dto.user.UserInfoResponse;
import ru.example.demo.dto.user.UserUpdateRequest;
import ru.example.demo.model.Role;
import ru.example.demo.model.User;
import ru.example.demo.dto.LoginRequest;
import ru.example.demo.dto.RegistrationRequest;

@UtilityClass
public class UserUtil {

  public User toUser(RegistrationRequest requestBody, PasswordEncoder passwordEncoder) {
    User user = new User();

    user.setName(requestBody.getName());
    user.setEmail(requestBody.getEmail());
    user.setPassword(encryptPassword(requestBody.getPassword(), passwordEncoder));
    user.setRoles(Set.of(Role.USER));

    return user;
  }

  public User toUser(UserCreateRequest requestBody, PasswordEncoder passwordEncoder) {
    User user = new User();

    user.setName(requestBody.getName());
    user.setEmail(requestBody.getEmail());
    user.setPassword(encryptPassword(requestBody.getPassword(), passwordEncoder));
    user.setRoles(RoleUtil.toSet(requestBody.getRoles()));

    return user;
  }

  public User toUser(User updateUser, UserUpdateRequest requestBody) {
    updateUser.setName(requestBody.getName());
    updateUser.setEmail(requestBody.getEmail());
    updateUser.setRoles(RoleUtil.toSet(requestBody.getRoles()));

    return updateUser;
  }

  public LoginRequest toLoginRequest(RegistrationRequest requestBody) {
    LoginRequest loginRequest = new LoginRequest();

    loginRequest.setEmail(requestBody.getEmail());
    loginRequest.setPassword(requestBody.getPassword());

    return loginRequest;
  }

  public UserInfoResponse toUserInfoResponse(User user) {
    UserInfoResponse userInfoResponse = new UserInfoResponse();

    userInfoResponse.setName(user.getName());
    userInfoResponse.setEmail(user.getEmail());
    userInfoResponse.setRoles(RoleUtil.toString(user.getRoles()));

    return userInfoResponse;
  }

  public UserDtoResponse toUserDtoResponse(User user) {
    UserDtoResponse userDtoResponse = new UserDtoResponse();

    userDtoResponse.setId(user.getId());
    userDtoResponse.setName(user.getName());
    userDtoResponse.setEmail(user.getEmail());
    userDtoResponse.setRoles(RoleUtil.toString(user.getRoles()));

    return userDtoResponse;
  }

  public UserCreateRequest toUserCreateRequest(RegistrationRequest requestBody) {
    UserCreateRequest userCreateRequest = new UserCreateRequest();

    userCreateRequest.setName(requestBody.getName());
    userCreateRequest.setEmail(requestBody.getEmail());
    userCreateRequest.setPassword(requestBody.getPassword());
    userCreateRequest.setRoles(Role.USER.name());

    return userCreateRequest;
  }

  private String encryptPassword(String password, PasswordEncoder passwordEncoder) {
    return passwordEncoder.encode(password);
  }
}

package ru.example.demo.web;

import java.util.Collection;
import java.util.Collections;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.example.demo.AuthUser;
import ru.example.demo.dto.LoginRequest;
import ru.example.demo.dto.RegistrationRequest;
import ru.example.demo.dto.user.UserDtoResponse;
import ru.example.demo.dto.user.UserInfoResponse;
import ru.example.demo.model.Role;
import ru.example.demo.service.UserService;
import ru.example.demo.util.UserUtil;

@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = AccountController.URL, produces = MediaType.APPLICATION_JSON_VALUE)
@AllArgsConstructor
public class AccountController {

  public static final String URL = "/api/account";

  private UserService userService;

  private AuthenticationManager authenticationManager;

  @PostMapping("/registration")
  public Map<String, Object> registration(@RequestBody RegistrationRequest requestBody) {
    UserDtoResponse registrationUser = userService.create(UserUtil.toUserCreateRequest(requestBody));
    log.info("registration user={}", registrationUser);

    return login(UserUtil.toLoginRequest(requestBody));
  }

  @PostMapping("/login")
  public Map<String, Object> login(@RequestBody LoginRequest requestBody) {
    var authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(requestBody.getEmail(), requestBody.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);

    Collection<Role> roles = (Collection<Role>) authentication.getAuthorities();
    log.info("authenticated user by email={}", requestBody.getEmail());

    return Collections.singletonMap("roles", roles);
  }

  @GetMapping
  public UserInfoResponse getInfo(@AuthenticationPrincipal AuthUser authUser) {
    UserInfoResponse userInfoResponse = UserUtil.toUserInfoResponse(authUser.getUser());
    log.info("get user info by email={}", userInfoResponse.getEmail());

    return userInfoResponse;
  }
}

package ru.example.demo.web;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import ru.example.demo.dto.user.UserCreateRequest;
import ru.example.demo.dto.user.UserDtoResponse;
import ru.example.demo.dto.user.UserUpdateRequest;
import ru.example.demo.model.User;
import ru.example.demo.service.UserService;

@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = UserController.URL, produces = MediaType.APPLICATION_JSON_VALUE)
@AllArgsConstructor
public class UserController {

  public static final String URL = "/api/user";

  private final UserService service;

  @GetMapping
  public List<UserDtoResponse> getAll() {
    List<UserDtoResponse> userDtoList = service.getAll();
    log.info("get all");
    return userDtoList;
  }

  @GetMapping(value = "/{id}")
  public User getById(@PathVariable("id") int id) {
    User user = service.getById(id);
    log.info("get user by id={}", id);
    return user;
  }

  @DeleteMapping(value = "/{id}")
  @ResponseStatus(value = HttpStatus.NO_CONTENT)
  public void delete(@PathVariable("id") int id) {
    service.delete(id);
    log.info("delete user by id={}", id);
  }

  @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
  @ResponseStatus(value = HttpStatus.CREATED)
  public UserDtoResponse create(@RequestBody UserCreateRequest requestBody) {
    UserDtoResponse savedUser = service.create(requestBody);
    log.info("save user");
    return savedUser;
  }

  @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
  @ResponseStatus(value = HttpStatus.OK)
  public UserDtoResponse update(@PathVariable("id") int id,
      @RequestBody UserUpdateRequest requestBody) {
    UserDtoResponse updateUser = service.update(id, requestBody);
    log.info("update user");
    return updateUser;
  }
}

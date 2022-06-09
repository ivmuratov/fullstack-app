package ru.example.demo.service;

import static ru.example.demo.config.CacheConfig.USERS_CACHE;
import static ru.example.demo.config.SecurityConfig.PASSWORD_ENCODER;

import java.util.List;
import java.util.stream.Collectors;
import javax.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import ru.example.demo.dto.user.UserCreateRequest;
import ru.example.demo.dto.user.UserDtoResponse;
import ru.example.demo.dto.user.UserUpdateRequest;
import ru.example.demo.model.User;
import ru.example.demo.repository.UserRepository;
import ru.example.demo.util.UserUtil;

@Slf4j
@Service
@Validated
@AllArgsConstructor
@CacheConfig(cacheNames = {USERS_CACHE})
public class UserService {

  private final UserRepository repository;

  @Cacheable
  public List<UserDtoResponse> getAll() {
    List<UserDtoResponse> userDtoList = repository.findAll()
        .stream()
        .map(UserUtil::toUserDtoResponse)
        .collect(Collectors.toList());
    log.info("get all");
    return userDtoList;
  }

  public User getById(int id) {
    User user = repository.findById(id).orElseThrow();
    log.info("get user by id={}", id);
    return user;
  }

  @CacheEvict(allEntries = true)
  public void delete(int id) {
    repository.deleteById(id);
    log.info("delete user by id={}", id);
  }

  @CacheEvict(allEntries = true)
  public UserDtoResponse create(@Valid UserCreateRequest requestBody) {
    User savedUser = repository.save(UserUtil.toUser(requestBody, PASSWORD_ENCODER));
    log.info("save user={}", savedUser);
    return UserUtil.toUserDtoResponse(savedUser);
  }

  @CacheEvict(allEntries = true)
  public UserDtoResponse update(int id, @Valid UserUpdateRequest requestBody) {
    User updateUser = getById(id);
    User savedUser = repository.save(UserUtil.toUser(updateUser, requestBody));
    log.info("update user={}", updateUser);
    return UserUtil.toUserDtoResponse(savedUser);
  }
}

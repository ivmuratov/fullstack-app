package ru.example.demo.web;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import ru.example.demo.web.exception.ErrorInfo;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

  @ExceptionHandler(value = org.springframework.dao.DataIntegrityViolationException.class)
  @ResponseStatus(value = HttpStatus.UNPROCESSABLE_ENTITY)
  protected ErrorInfo handleUniqueKey() {
    ErrorInfo errorInfo = new ErrorInfo(HttpStatus.UNPROCESSABLE_ENTITY.toString(),
        "This email already exists, please enter another one");
    log.warn("handle unique mail exception={}", errorInfo);
    return errorInfo;
  }

  @ExceptionHandler(value = javax.validation.ConstraintViolationException.class)
  @ResponseStatus(value = HttpStatus.BAD_REQUEST)
  protected ErrorInfo handleConstraintViolationException(javax.validation.ConstraintViolationException e) {
    ErrorInfo errorInfo = new ErrorInfo(HttpStatus.BAD_REQUEST.toString(),
        e.getMessage());
    log.warn("handle constraint violation exception={}", errorInfo);
    return errorInfo;
  }
}

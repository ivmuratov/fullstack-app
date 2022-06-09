package ru.example.demo;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootTest
class TestProjectApplicationTests {

  @Test
  void contextLoads() {
    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    for (int i = 1; i < 16; i++) {
      System.out.println("Пароль - " + i);
      String hashPassword = passwordEncoder.encode(String.valueOf(i));
      System.out.println(hashPassword);
      System.out.println();
    }
  }
}

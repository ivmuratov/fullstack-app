package ru.example.demo.config;

import java.util.Collections;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import ru.example.demo.AuthUser;
import ru.example.demo.model.Role;
import ru.example.demo.model.User;
import ru.example.demo.repository.UserRepository;

@Slf4j
@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

  public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

  private final UserRepository userRepository;

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.authorizeRequests()
        .antMatchers(HttpMethod.POST, "/api/account/registration").permitAll()
        .antMatchers(HttpMethod.POST, "/api/account/login").permitAll()
        .antMatchers(HttpMethod.GET, "/api/account").authenticated()
        .antMatchers("/api/user/**").hasRole(Role.ADMIN.name())
        .and().httpBasic()
        .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and().csrf().disable()
        .cors();
  }

  @Bean
  public UserDetailsService userDetailsService() {
    return email -> {
      User user = userRepository.findByEmailIgnoreCase(email)
          .orElseThrow(() -> {
            log.warn("user not found by - {}", email);
            throw new UsernameNotFoundException("User not found");
          });
      log.info("get user by email - {}", email);
      return new AuthUser(user);
    };
  }

  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.userDetailsService(userDetailsService())
        .passwordEncoder(PASSWORD_ENCODER);
  }

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    var corsConfig = new CorsConfiguration();
    corsConfig.setAllowedHeaders(List.of("Authorization", "Cache-Control", "Content-Type"));
    corsConfig.setAllowedOrigins(Collections.singletonList("http://localhost:3000"));
    corsConfig.setAllowedMethods(
        List.of("GET", "POST", "PUT", "DELETE", "PUT", "OPTIONS", "PATCH", "DELETE"));
    corsConfig.setAllowCredentials(true);
    corsConfig.setExposedHeaders(Collections.singletonList("Authorization"));

    var corsSource = new UrlBasedCorsConfigurationSource();
    corsSource.registerCorsConfiguration("/**", corsConfig);
    return corsSource;
  }

  @Bean
  @Override
  public AuthenticationManager authenticationManagerBean() throws Exception {
    return super.authenticationManagerBean();
  }
}

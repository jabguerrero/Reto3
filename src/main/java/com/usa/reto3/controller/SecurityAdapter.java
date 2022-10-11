package com.usa.reto3.controller;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class SecurityAdapter extends WebSecurityConfigurerAdapter {
        @Override
        protected void configure(HttpSecurity http) throws Exception {
            http.authorizeRequests(a -> a
                    .antMatchers("/", "/error", "/webjars/**","/api/**","/Category/**", "/Motorbike/**", "/Message/**", "/Reservation/**", "/Score/**", "/Client/**","/h2-console").permitAll().anyRequest().authenticated()

            ).exceptionHandling(e -> e
                    .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
            ).oauth2Login().defaultSuccessUrl("/index.html", true);

            http.cors().and().csrf().disable();

        }

}


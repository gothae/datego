package com.example.datego.config;

import com.example.datego.config.properties.AppProperties;
import com.example.datego.oauth.exception.RestAuthenticationEntryPoint;
import com.example.datego.oauth.filter.TokenAuthenticationFilter;
import com.example.datego.oauth.handler.TokenAccessDeniedHandler;
import com.example.datego.oauth.token.AuthTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@Configuration
@RequiredArgsConstructor
public class WebSecurityConfigure {
    private final AuthTokenProvider authTokenProvider;
    private final CorsConfig corsConfig;
    private final AppProperties appProperties;
    private final TokenAccessDeniedHandler tokenAccessDeniedHandler;
//    private final AuthenticationManager authenticationManager;
//
//    @Bean
//    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
//            throws Exception {
//        return authenticationConfiguration.getAuthenticationManager();
//    }
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{

        http
                .cors()
                .and()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .addFilterBefore(new TokenAuthenticationFilter(authTokenProvider), UsernamePasswordAuthenticationFilter.class)
                .addFilter(corsConfig.corsFilter()) // @CrossOrigin(인증 X), 시큐리티 필터에 등록해줘야함.
                .exceptionHandling()
                .authenticationEntryPoint(new RestAuthenticationEntryPoint())
                .accessDeniedHandler(tokenAccessDeniedHandler)
                .and()
                .authorizeRequests()
                .antMatchers("/api/v2/**","/health","/swagger-ui.html","/swagger/**","/swagger-resources/**","/webjars/**","/v2/api-docs").permitAll()
                .antMatchers("/admin/**").hasRole("ADMIN")
                .antMatchers("/member/**").hasRole("MEMBER")
                .anyRequest().permitAll();




        return http.build();
    }

}
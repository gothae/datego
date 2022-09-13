package com.example.datego.Config;

import com.example.datego.Config.Properties.AppProperties;
import com.example.datego.oauth.exception.RestAuthenticationEntryPoint;
import com.example.datego.oauth.filter.TokenAuthenticationFilter;
import com.example.datego.oauth.handler.OAuth2AuthenticationFailureHandler;
import com.example.datego.oauth.handler.OAuth2AuthenticationSuccessHandler;
import com.example.datego.oauth.handler.TokenAccessDeniedHandler;
import com.example.datego.oauth.repository.OAuth2AuthorizationRequestBasedOnCookieRepository;
import com.example.datego.oauth.service.CustomOAuth2UserService;
import com.example.datego.oauth.token.AuthTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@Configuration
@RequiredArgsConstructor
public class WebSecurityConfigure {
    private final AuthTokenProvider authTokenProvider;

    private final CustomOAuth2UserService customOAuth2UserService;
//    private final MemberRepository memberRepository;

    private final CorsConfig corsConfig;
    private final AppProperties appProperties;
//    private final RefreshTokenRepository refreshTokenRepository;
    private final TokenAccessDeniedHandler tokenAccessDeniedHandler;

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }


    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler() {
        return new OAuth2AuthenticationSuccessHandler(
                memberRepository,
                authTokenProvider,
                appProperties,
                refreshTokenRepository,
                oAuth2AuthorizationRequestBasedOnCookieRepository(),
                memberInfoRepository
        );
    }
    @Bean
    public OAuth2AuthorizationRequestBasedOnCookieRepository oAuth2AuthorizationRequestBasedOnCookieRepository() {
        return new OAuth2AuthorizationRequestBasedOnCookieRepository();
    }
    @Bean
    public OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler(){
        return new OAuth2AuthenticationFailureHandler(
                oAuth2AuthorizationRequestBasedOnCookieRepository()
        );
    }
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
                .anyRequest().permitAll()
                .and()
                .oauth2Login()
                .authorizationEndpoint()
                .baseUri("/oauth2/authorization")
                .authorizationRequestRepository(oAuth2AuthorizationRequestBasedOnCookieRepository())
                .and()
                .redirectionEndpoint()
                .baseUri("/*/oauth2/code/*")
                .and()
                .userInfoEndpoint()
                .userService(customOAuth2UserService)
                .and()
                .successHandler(oAuth2AuthenticationSuccessHandler())
                .failureHandler(oAuth2AuthenticationFailureHandler());




        return http.build();
    }

}
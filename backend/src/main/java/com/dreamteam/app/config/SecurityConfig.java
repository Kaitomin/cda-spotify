package com.dreamteam.app.config;

import com.dreamteam.app.jwt.JwtAuthFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;


import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(withDefaults())
            .csrf(AbstractHttpConfigurer::disable)
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers(HttpMethod.OPTIONS,"/**").permitAll()
                .requestMatchers(
                        "/",
                        "/index.html",
                        "/assets/**",
                        "/api/music",
                        "/api/music/{id:[0-9]+}",
                        "/api/music/search/**",
                        "/api/music/byTag/{tag:[A-Z]+}",
                        "/api/music/byArtist/{artist:[a-zA-Z]+}",
                        "/api/auth/**",
                        "/api/tag",
                        "/img/**",
                        "/audio/**"
                ).permitAll()
                .requestMatchers(
                        "/api/playlist",
                        "/api/music/new",
                        "/api/music/update/{id:[0-9]+}",
                        "/api/music/delete/{id:[0-9]+}"
                ).hasAuthority("ADMIN")
                .anyRequest().authenticated()
            )
            //.authenticationProvider(authenticationProvider)
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        //.rememberMe(Customizer.withDefaults());
        return http.build();
    }
}

package com.dreamteam.app.config;

import com.dreamteam.app.interceptors.AuthInterceptor;
import com.dreamteam.app.jwt.JwtAuthFilter;
import com.dreamteam.app.jwt.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.*;
import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig implements WebMvcConfigurer {

    private final JwtAuthFilter jwtAuthFilter;
    private final JwtService jwtService;
    private final AuthenticationProvider authenticationProvider;

    @Value("${spring.frontend.url}") String url;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(url)
                .allowedMethods("*")
                .allowedHeaders("*")
                .exposedHeaders("*")
                .allowCredentials(true);
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new AuthInterceptor(jwtService));
        WebMvcConfigurer.super.addInterceptors(registry);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**")
                .addResourceLocations("/", "classpath:/static/");
        WebMvcConfigurer.super.addResourceHandlers(registry);
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("forward:/index.html");
        WebMvcConfigurer.super.addViewControllers(registry);
    }

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
                        "/*.png",
                        "/*.gif",
                        "/*.webp",
                        "/index.html",
                        "/favicon.ico",
                        "/assets/**",
                        "/api/music",
                        "/api/music/{id:[0-9]+}",
                        "/api/music/search/**",
                        "/api/music/byTag/{tag:[A-Z]+}",
                        "/api/music/byArtist/{artist:[a-zA-Z0-9 ]+}",
                        "/api/auth/**",
                        "/api/tag",
                        "/img/**",
                        "/audio/**"
                ).permitAll()
                .requestMatchers(
                        "/api/playlist",
                        "/api/user/delete/{id:[0-9]+}",
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

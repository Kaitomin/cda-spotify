package com.dreamteam.app.jwt;

import com.dreamteam.app.utils.CustomUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;

import org.springframework.util.AntPathMatcher;
import org.springframework.util.PathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
//    private final PathMatcher pathMatcher;

//    @Override
//    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
//        List<String> arr = new ArrayList<>(
//            Arrays.asList(
//                "/",
//                "/*.png",
//                "/*.gif",
//                "/*.webp",
//                "/index.html",
//                "/favicon.ico",
//                "/assets/**",
//                "/api/music",
//                "/api/music/{id:[0-9]+}",
//                "/api/music/search/**",
//                "/api/music/byTag/{tag:[A-Z]+}",
//                "/api/music/byArtist/{artist:[a-zA-Z0-9 ]+}",
//                "/api/auth/**",
//                "/api/tag",
//                "/img/**",
//                "/audio/**"
//            )
//        );
//        return arr.stream().anyMatch(p -> pathMatcher.match(p, request.getRequestURI()));
//    }


    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        AntPathMatcher antPathMatcher = new AntPathMatcher();
        List<String> arr = new ArrayList<>(
            Arrays.asList(
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
            )
        );
        return arr.stream().anyMatch(p -> antPathMatcher.match(p, request.getRequestURI()));
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

//        System.out.println("JwtAuthFilter");

        // Extract JWT from cookie
        final String jwt = CustomUtils.getCookie(request.getCookies(), "jwt");
        final String userEmail;

        userEmail = jwtService.extractUsername(jwt);

        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
            if (jwtService.isTokenValid(jwt, userDetails, request.getHeader("x-csrf-token"))) {
//                System.out.println("userDetails : " + userDetails);
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );
//                System.out.println("AUTHTOKEN : " + authToken);
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);
    }
}

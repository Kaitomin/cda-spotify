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
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
//        System.out.println("JwtAuthFilter");
//        System.out.println(request.getMethod());
//        System.out.println("Cookies" + request.getCookies());

        // With cookie
        // Extract JWT from cookie
        final String jwt = CustomUtils.getCookie(request.getCookies(), "jwt");
        final String userEmail;

        if (jwt == null) {
//            System.out.println("jwt NULL / MALFORMED " + jwt);
            filterChain.doFilter(request, response);
            return;
        }

//        System.out.println("JWT " + jwt);

        userEmail = jwtService.extractUsername(jwt);

//        System.out.println("USERNAME " + userEmail);

        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
            if (jwtService.isTokenValid(jwt, userDetails)) {
//                System.out.println("userDetails : " + userDetails);
//                System.out.println("userDetails authorities : " + userDetails.getAuthorities());
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

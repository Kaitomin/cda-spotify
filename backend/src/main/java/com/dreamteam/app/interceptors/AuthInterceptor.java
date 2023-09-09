package com.dreamteam.app.interceptors;

import com.dreamteam.app.exceptions.AuthenticationException;
import com.dreamteam.app.jwt.JwtService;
import com.dreamteam.app.utils.CustomUtils;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
@RequiredArgsConstructor
public class AuthInterceptor implements HandlerInterceptor {
    private final JwtService jwtService;
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
//        System.out.println("CustomInterceptor, URI : " + request.getRequestURI());

        if (request.getRequestURI().contains("/api/auth/authenticate") || request.getRequestURI().contains("/api/auth/register")) {
            // Check if already logged in but still tries to log in
            if (CustomUtils.getCookie(request.getCookies(), "jwt") != null) {
                throw new AuthenticationException("Already logged in");
            }
        }

        if (request.getRequestURI().contains("/api/auth/checkCookie")) {
            String token = CustomUtils.getCookie(request.getCookies(), "jwt");
            // Cookie missing
            if (token == null) {
                throw new AuthenticationException("Cookie not found");
            }
            // CSRF token not valid
            if (!jwtService.extractCsrfToken(token).equals(request.getHeader("x-csrf-token"))) {
                Cookie cookie = new Cookie("jwt", null);
                cookie.setMaxAge(0);
                cookie.setPath("/");

                response.addCookie(cookie);
                throw new AuthenticationException("Invalid X-CSRF-TOKEN");
            }
        }
        return true;
    }

//    @Override
//    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
//        HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
//    }
//
//    @Override
//    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
//        HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
//    }
}

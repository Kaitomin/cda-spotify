package com.dreamteam.app.interceptors;

import com.dreamteam.app.exceptions.AuthenticationException;
import com.dreamteam.app.utils.CustomUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class AuthInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
//        System.out.println("CustomInterceptor, URI : " + request.getRequestURI());

        // Authentication - Registration check
        if (request.getRequestURI().contains("/api/auth/authenticate") || request.getRequestURI().contains("/api/auth/register")) {
            // Check if already logged in but still tries to log in
            if (CustomUtils.getCookie(request.getCookies(), "jwt") != null) {
                throw new AuthenticationException("Already logged in");
            }
        }

        // Cookie missing
        if (request.getRequestURI().contains("/api/auth/checkCookie")) {
            // Check if already logged in but still tries to log in
            if (CustomUtils.getCookie(request.getCookies(), "jwt") == null) {
                throw new AuthenticationException("Cookie not found");
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

package com.dreamteam.app.interceptors;

import com.dreamteam.app.exceptions.Authentication;
import com.dreamteam.app.utils.CustomUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

public class CustomInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
//        System.out.println("CustomInterceptor, URI : " + request.getRequestURI());

        // Check if already logged in but still tries to log in
        if (request.getRequestURI().contains("/api/auth/authenticate") || request.getRequestURI().contains("/api/auth/register")) {
            if (CustomUtils.getCookie(request.getCookies(), "jwt") != null) {
                throw new Authentication("Already logged in");
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

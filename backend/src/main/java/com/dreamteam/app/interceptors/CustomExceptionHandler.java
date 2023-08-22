package com.dreamteam.app.interceptors;

import com.dreamteam.app.exceptions.Authentication;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(Authentication.class)
    public ResponseEntity<?> handleAuthenticateException(Exception e, WebRequest request) {
        System.out.println("in AUTH EXCEPTION");
        return handleExceptionInternal(e, "OFF", new HttpHeaders(), HttpStatus.FORBIDDEN, request);
    }
}

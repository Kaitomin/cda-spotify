package com.dreamteam.app.interceptors;

import com.dreamteam.app.exceptions.AuthenticationException;
import com.dreamteam.app.exceptions.MusicException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<?> handleAuthenticateException(Exception e, WebRequest request) {
        System.out.println(e.getMessage());
        return handleExceptionInternal(e, "OFF", new HttpHeaders(), HttpStatus.FORBIDDEN, request);
    }

    @ExceptionHandler(MusicException.class)
    public ResponseEntity<?> handleMusicException(Exception e, WebRequest request) {
        return handleExceptionInternal(e, e.getMessage(), new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }
}

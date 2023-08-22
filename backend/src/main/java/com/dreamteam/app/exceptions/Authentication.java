package com.dreamteam.app.exceptions;

public class Authentication extends Exception {
    public Authentication(String message) {
        super(message);
    }

    public Authentication(String message, Throwable cause) {
        super(message, cause);
    }
}

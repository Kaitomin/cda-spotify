package com.dreamteam.app.exceptions;

public class MusicException extends Exception {
    public MusicException(String message) {
        super(message);
    }

    public MusicException(String message, Throwable cause) {
        super(message, cause);
    }
}

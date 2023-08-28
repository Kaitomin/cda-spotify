package com.dreamteam.app.auth;
import com.dreamteam.app.dto.UserDTO;
import com.dreamteam.app.exceptions.AuthenticationException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;


public interface IAuthenticationService {
    void register(AuthenticationRequest req);
    AuthenticationResponse authenticate(AuthenticationRequest req);
    String checkCookie(Cookie[] cookies) throws AuthenticationException;
    void logout(HttpServletResponse response);
}

package com.dreamteam.app.auth;
import com.dreamteam.app.dto.UserDTO;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;


public interface IAuthenticationService {
    void register(UserDTO req);
    AuthenticationResponse authenticate(AuthenticationRequest req);
    String checkCookie(Cookie[] cookies);
    void logout(HttpServletResponse response);
}

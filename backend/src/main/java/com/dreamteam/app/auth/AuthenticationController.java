package com.dreamteam.app.auth;

import com.dreamteam.app.dto.UserDTO;
import com.dreamteam.app.exceptions.Authentication;
import com.dreamteam.app.utils.CustomUtils;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody UserDTO req, HttpServletResponse response) {
        service.register(req);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest req,
            HttpServletResponse response,
            HttpServletRequest request
    ) {
        AuthenticationResponse authRes = service.authenticate(req);
        response.addCookie(authRes.getToken());
        return ResponseEntity.ok(service.authenticate(req));
    }

    @GetMapping("/checkCookie")
    public ResponseEntity<String> checkCookie(HttpServletRequest request) {
        return ResponseEntity.ok(service.checkCookie(request.getCookies()));
    }

    @GetMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        service.logout(response);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

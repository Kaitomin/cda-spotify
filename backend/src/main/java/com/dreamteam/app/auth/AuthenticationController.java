package com.dreamteam.app.auth;

import com.dreamteam.app.dto.UserDTO;
import com.dreamteam.app.exceptions.AuthenticationException;
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
    private final AuthenticationServiceImpl service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody UserDTO req) throws AuthenticationException {
        if (req.getUsername().isEmpty() || req.getPassword().isEmpty()) {
            throw new AuthenticationException("Empty field");
        }
        service.register(req);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<Void> authenticate(
            @RequestBody AuthenticationRequest req,
            HttpServletResponse response
    ) throws AuthenticationException {
        if (req.getUsername().isEmpty() || req.getPassword().isEmpty()) {
            throw new AuthenticationException("Empty field");
        }

        AuthenticationResponse authRes = service.authenticate(req);
        System.out.println(authRes.getToken());
        response.addCookie(authRes.getToken());
        return new ResponseEntity<>(HttpStatus.OK);
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

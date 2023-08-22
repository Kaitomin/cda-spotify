package com.dreamteam.app.auth;

import com.dreamteam.app.dto.UserDTO;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService service;

 /*   @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody UserDTO req) {
        return ResponseEntity.ok(service.register(req));
    }*/
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody UserDTO req, HttpServletResponse response) {
//        AuthenticationResponse authRes = service.register(req);
//
//        response.addCookie(authRes.getJwtCookie());
//        return AuthenticationResponse.builder()
//                .id(authRes.getId())
//                .username(authRes.getUsername())
//                .role(authRes.getRole())
//                .build();

        return ResponseEntity.ok(service.register(req));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest req,
            HttpServletResponse response
    ) {
        AuthenticationResponse authRes = service.authenticate(req);
        response.addCookie(authRes.getJwtCookie());
        return ResponseEntity.ok(service.authenticate(req));
    }

    @GetMapping("/checkCookie")
    public ResponseEntity<String> checkCookie(HttpServletRequest request) {
        return ResponseEntity.ok(service.checkCookie(request.getCookies()));
    }

    @GetMapping("/logout")
    public ResponseEntity<String> logout(HttpServletResponse response) {
        return service.logout(response);
    }
}

package com.dreamteam.app.auth;

import com.dreamteam.app.dto.UserDTO;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
            @RequestBody AuthenticationRequest req
    ) {
        return ResponseEntity.ok(service.authenticate(req));
    }
}

package com.dreamteam.app.auth;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationServiceImpl service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody @Valid AuthenticationRequest req) {
        service.register(req);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody @Valid AuthenticationRequest req,
            HttpServletResponse response
    ) {
        AuthenticationResponse authRes = service.authenticate(req);
        ResponseCookie cookie = ResponseCookie.from("jwt", authRes.getToken())
            .httpOnly(true)
            .secure(true)
            .path("/")
            .maxAge(24 * 60 * 60)
            .sameSite("Lax")  // sameSite
            .build();

        // Response to the client
        response.setHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return ResponseEntity.ok(authRes);
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

package com.dreamteam.app.auth;

import com.dreamteam.app.enums.Role;
import jakarta.servlet.http.Cookie;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    private long id;
    private Cookie jwtCookie;
    private String username;
    private Role role;
    private String token;
}
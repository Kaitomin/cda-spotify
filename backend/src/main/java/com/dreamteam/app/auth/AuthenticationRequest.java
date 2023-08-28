package com.dreamteam.app.auth;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationRequest {
    @NonNull
    @Pattern(regexp = "^[a-zA-Z0-9]+$")
    @Size(min = 2, message = "Username must have at least 2 characters")
    private String username;

    @NonNull
    @Pattern(regexp = "^[a-zA-Z0-9!+_]+$")
    @Size(min = 2, message = "Password must have at least 5 characters")
    private String password;
}

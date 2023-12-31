package com.dreamteam.app.auth;

import com.dreamteam.app.dto.PlaylistDTO;
import com.dreamteam.app.dto.UserDTO;
import com.dreamteam.app.entities.Playlist;
import com.dreamteam.app.entities.User;
import com.dreamteam.app.enums.Role;
import com.dreamteam.app.exceptions.AuthenticationException;
import com.dreamteam.app.jwt.JwtService;
import com.dreamteam.app.repositories.UserRepository;
import com.dreamteam.app.utils.CustomUtils;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements IAuthenticationService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final ModelMapper mapper;

    public void register(AuthenticationRequest req) {
        // Auto create 'Favoris' playlist
        PlaylistDTO playlistDTO = new PlaylistDTO();
        playlistDTO.setName("Favoris");
        playlistDTO.setCreatedAt(LocalDate.now());
        playlistDTO.setMusics(Collections.emptyList());

        List<Playlist> playlists = new ArrayList<>();
        playlists.add(mapper.map(playlistDTO, Playlist.class));

        // Create user
        var user = User.builder()
            .username(req.getUsername())
            .password(passwordEncoder.encode(req.getPassword()))
            .role(Role.CLIENT)
            .playlists(playlists)
            .build();
        repository.save(user);
    }

    public AuthenticationResponse authenticate(AuthenticationRequest req) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                req.getUsername(),
                req.getPassword()
            )
        );
        var user = repository.findByUsername(req.getUsername()).orElse(null);
        var jwtToken = jwtService.generateToken(user);

        Cookie cookie = new Cookie("jwt", jwtToken);
        cookie.setMaxAge(24 * 60 * 60); // expires in 1 day
        cookie.setSecure(true); // in production mode
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        return AuthenticationResponse.builder()
            .token(cookie)
            .build();
    }

    public String checkCookie(Cookie[] cookies) {
        return CustomUtils.getCookie(cookies, "jwt");
    }

    public void logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("jwt", null);
        cookie.setMaxAge(0); // expires in 7 days
        cookie.setSecure(true); // in production mode
        cookie.setHttpOnly(true);
        cookie.setPath("/");

        response.addCookie(cookie);
    }
}

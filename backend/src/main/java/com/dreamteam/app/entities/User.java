package com.dreamteam.app.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
@Entity
public class User {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String password;
    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany
    private List<Playlist> playlists;

    public User(String name, String password, Role role, List<Playlist> playlists) {
        this.name = name;
        this.password = password;
        this.role = role;
        this.playlists = playlists;
    }

    public User() {
    }
}

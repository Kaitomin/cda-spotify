package com.dreamteam.app.entities;

import com.dreamteam.app.enums.Role;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @NonNull
    private String name;
    @NonNull
    private String password;
    @Enumerated(EnumType.STRING)
    @NonNull
    private Role role;
    @OneToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    //@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @NonNull
    private List<Playlist> playlists;
}

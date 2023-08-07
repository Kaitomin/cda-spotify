package com.dreamteam.app.dto;

import com.dreamteam.app.entities.Playlist;
import com.dreamteam.app.enums.Role;
import lombok.Data;

import java.util.List;

@Data
public class UserDTO {
    private long id;
    private String name;
    private String password;
    private Role role;
    private List<Playlist> playlists;
}
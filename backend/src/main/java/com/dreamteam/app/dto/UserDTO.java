package com.dreamteam.app.dto;

import com.dreamteam.app.entities.Playlist;
import com.dreamteam.app.entities.Role;
import lombok.Data;

import java.util.List;

@Data
public class UserDTO {

    private Long id;
    private String name;
    private String password;
    private Role role;
    private List<Playlist> playlists;

}

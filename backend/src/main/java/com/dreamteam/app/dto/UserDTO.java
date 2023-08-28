package com.dreamteam.app.dto;

import com.dreamteam.app.entities.Playlist;
import com.dreamteam.app.enums.Role;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Data
public class UserDTO {
    private long id;

    private String username;

    private String password;

    private Role role;

    private List<Playlist> playlists;

    private Integer Version;
}

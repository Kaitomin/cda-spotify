package com.dreamteam.app.dto;

import com.dreamteam.app.entities.Music;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class PlaylistDTO {
    private long id;

    @Pattern(regexp = "^[a-zA-Z0-9 ]+$")
    @Size(min = 2, message = "Name must have at least 2 characters")
    private String name;

    private List<Music> musics;

    private LocalDate createdAt;

    private Integer Version;
}

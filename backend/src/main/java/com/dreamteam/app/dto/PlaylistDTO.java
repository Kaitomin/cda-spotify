package com.dreamteam.app.dto;

import com.dreamteam.app.entities.Music;
import jakarta.persistence.CascadeType;
import jakarta.persistence.ManyToMany;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class PlaylistDTO {
    private long id;
    private String name;
    private List<Music> musics;
    private LocalDate createdAt;
}

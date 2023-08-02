package com.dreamteam.app.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Entity
public class Playlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Music> musics;
    private LocalDate createdAt;

    public Playlist(String name, List<Music> musics, LocalDate createdAt) {
        this.name = name;
        this.musics = musics;
        this.createdAt = createdAt;
    }

    public Playlist() {
    }
}

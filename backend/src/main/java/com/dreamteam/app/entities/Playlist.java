package com.dreamteam.app.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Playlist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @NonNull
    private String name;
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @NonNull
    private List<Music> musics;
    @NonNull
    private LocalDate createdAt;
}

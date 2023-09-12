package com.dreamteam.app.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Playlist implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NonNull
    @Pattern(regexp = "^[a-zA-Z0-9 ]+$")
    @Size(min = 2, message = "Name must have at least 2 characters")
    private String name;

    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @NonNull
    private List<Music> musics;

    @NonNull
    private LocalDate createdAt;

    @Version
    private Integer version;
}

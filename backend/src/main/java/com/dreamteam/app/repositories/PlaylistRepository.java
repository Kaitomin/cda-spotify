package com.dreamteam.app.repositories;

import com.dreamteam.app.entities.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PlaylistRepository extends JpaRepository<Playlist, Long> {
    @Query("SELECT p FROM User u JOIN u.playlists p WHERE u.id =:id")
    List<Playlist> findAllByUserId(long id);
}

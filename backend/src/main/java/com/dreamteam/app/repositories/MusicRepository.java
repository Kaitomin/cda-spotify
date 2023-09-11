package com.dreamteam.app.repositories;

import com.dreamteam.app.enums.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import com.dreamteam.app.entities.Music;
import org.springframework.data.jpa.repository.Query;

import java.util.Arrays;
import java.util.List;

public interface MusicRepository extends JpaRepository<Music, Long> {
    List<Music> findTop10ByArtist(String artist);

	List<Music> findByTitleContainingIgnoreCaseOrArtistContainingIgnoreCase(String title, String artist);

    List<Music> findByArtistContainingIgnoreCase(String artist);

    List<Music> findByTitleContainingIgnoreCase(String title);

    @Query("SELECT m FROM Music m ORDER BY RAND() LIMIT 4")
    List<Music> findRandomMusic();


}

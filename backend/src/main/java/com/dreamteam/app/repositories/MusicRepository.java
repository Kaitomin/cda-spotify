package com.dreamteam.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dreamteam.app.entities.Music;

public interface MusicRepository extends JpaRepository<Music, Long> {

	
}

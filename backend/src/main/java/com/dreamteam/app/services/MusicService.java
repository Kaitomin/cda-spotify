package com.dreamteam.app.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.dreamteam.app.entities.Music;
import com.dreamteam.app.repositories.MusicRepository;

import lombok.RequiredArgsConstructor;

@Service
public class MusicService {

	private MusicRepository repository; 
	
	public List<Music> findAll(){
		return repository.findAll();
	}

	public MusicService(MusicRepository repository) {
		this.repository = repository;
	}
	
	public Music add(Music m) {
		return repository.save(m);
	}
}

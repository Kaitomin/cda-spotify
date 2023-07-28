package com.dreamteam.app.services;

import java.util.List;
import java.util.Optional;

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

	public void delete(Long id){ repository.deleteById(id); }

	public Music getById(Long id) {
		Optional<Music> musicOptional = repository.findById(id);
		return musicOptional.map( m -> m).orElse(null);
	}

	public  Music update(Long id, Music music){
		Music m = repository.findById(id).orElse(null);
		if(m != null){
			return repository.save(music);

		}
		return null;

	}


}

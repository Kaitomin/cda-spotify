package com.dreamteam.app.services;

import java.util.List;

import com.dreamteam.app.dto.MusicDTO;
import com.dreamteam.app.mappers.MusicMapper;
import org.springframework.stereotype.Service;

import com.dreamteam.app.repositories.MusicRepository;

@Service
public class MusicService {

	private final MusicRepository repository;
	private final MusicMapper mapper;
	
	public List<MusicDTO> findAll(){
		return repository.findAll().stream().map(mapper::toDto).toList();
	}


	public MusicService(MusicRepository repository, MusicMapper mapper) {
		this.repository = repository;
		this.mapper = mapper;
	}
	
	public MusicDTO add(MusicDTO m) {
		//throw new RuntimeException("Not implemented");
		return mapper.toDto(repository.save(mapper.toEntity(m)));
	}

	public void delete(Long id){ repository.deleteById(id); }

	public MusicDTO getById(Long id) {
		//Optional<Music> musicOptional = repository.findById(id);
		return repository.findById(id).map(mapper::toDto).orElse(null);
	}




}

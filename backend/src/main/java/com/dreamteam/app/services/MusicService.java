package com.dreamteam.app.services;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import com.dreamteam.app.dto.MusicDTO;
import com.dreamteam.app.entities.Music;
import com.dreamteam.app.storage.StorageService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.dreamteam.app.repositories.MusicRepository;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class MusicService {
	private final MusicRepository repository;
	private final ModelMapper mapper;
	private final StorageService storageService;
	
	public List<MusicDTO> findAll(){
		return repository.findAll().stream().map(music -> mapper.map(music, MusicDTO.class)).toList();
	}
	public MusicDTO add(MusicDTO mDto, MultipartFile imgFile, MultipartFile audioFile, Optional<Long> id) {
		try {
			storageService.store(imgFile);
			storageService.store(audioFile);

			if (id != null) mDto.setId(id.get());

			mDto.setImgUri(imgFile.getOriginalFilename());
			mDto.setAudioUri(audioFile.getOriginalFilename());
		} catch (IllegalArgumentException e) {
			System.out.println(e.getMessage());
		} catch (IOException e) {
			System.out.println(e.getMessage());
		}
		return mapper.map(repository.save(mapper.map(mDto, Music.class)), MusicDTO.class);
	}
	public void delete(long id){ repository.deleteById(id); }
	public MusicDTO getById(long id) {
		return repository.findById(id).map(music -> mapper.map(music, MusicDTO.class)).orElse(null);
	}
}

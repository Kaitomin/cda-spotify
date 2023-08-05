package com.dreamteam.app.services;

import java.io.IOException;
import java.util.List;

import com.dreamteam.app.dto.MusicDTO;
import com.dreamteam.app.mappers.MusicMapper;
import com.dreamteam.app.storage.StorageService;
import org.springframework.stereotype.Service;

import com.dreamteam.app.repositories.MusicRepository;
import org.springframework.web.multipart.MultipartFile;

@Service
public class MusicService {
	private final MusicRepository repository;
	private final MusicMapper mapper;
	private final StorageService storageService;

	public MusicService(MusicRepository repository, MusicMapper mapper, StorageService storageService) {
		this.repository = repository;
		this.mapper = mapper;
		this.storageService = storageService;
	}
	public List<MusicDTO> findAll(){
		return repository.findAll().stream().map(mapper::toDto).toList();
	}

	public MusicDTO add(MusicDTO mDto, MultipartFile imgFile, MultipartFile audioFile) {
		try {
			storageService.store(imgFile);
			storageService.store(audioFile);
			mDto.setImgUri(imgFile.getOriginalFilename());
			mDto.setAudioUri(audioFile.getOriginalFilename());
		} catch (IllegalArgumentException e) {
			System.out.println(e.getMessage());
		} catch (IOException e) {
			System.out.println(e.getMessage());
		}
		return mapper.toDto(repository.save(mapper.toEntity(mDto)));
	}

	public void delete(Long id){ repository.deleteById(id); }

	public MusicDTO getById(Long id) {
		return repository.findById(id).map(mapper::toDto).orElse(null);
	}

}

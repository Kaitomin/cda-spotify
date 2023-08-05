package com.dreamteam.app.controllers;

import java.util.List;
import java.util.Optional;

import com.dreamteam.app.dto.MusicDTO;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import com.dreamteam.app.services.MusicService;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/music")
@AllArgsConstructor
public class MusicController {
	private final MusicService service;

	@GetMapping
	public List<MusicDTO> findAll(){
		return service.findAll();
	}

	@DeleteMapping("/delete/{id}")
	public void delete(@PathVariable Long id){
		 service.delete(id);
	}

	@GetMapping("/{id}")
	public MusicDTO getById(@PathVariable Long id){
		return service.getById(id);
	}

	@PostMapping("/new")
	public MusicDTO add(
		@RequestPart("fileUpload") MusicDTO musicDTO,
		@RequestPart("imgFile") MultipartFile imgFile,
		@RequestPart("audioFile") MultipartFile audioFile
	) {
		return service.add(musicDTO, imgFile, audioFile, null);
	}

	@PostMapping("/update/{id}")
	public MusicDTO update(
		@PathVariable Optional<Long> id,
		@RequestPart("fileUpload") MusicDTO musicDTO,
		@RequestPart("imgFile") MultipartFile imgFile,
		@RequestPart("audioFile") MultipartFile audioFile
	){
		System.out.println(id);
		return service.add(musicDTO, imgFile, audioFile, id);
	}
}

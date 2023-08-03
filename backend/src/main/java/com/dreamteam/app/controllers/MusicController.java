package com.dreamteam.app.controllers;

import java.util.List;

import com.dreamteam.app.dto.MusicDTO;
import com.dreamteam.app.storage.StorageService;
import org.springframework.web.bind.annotation.*;

import com.dreamteam.app.services.MusicService;

@RestController
@RequestMapping("/api/music")
public class MusicController {
	private MusicService service;
	private final StorageService storageService;

	public MusicController(MusicService service, StorageService storageService) {
		this.service = service;
		this.storageService = storageService;
	}

	@GetMapping
	public List<MusicDTO> findAll(){
		return service.findAll();
	}
	
	@PostMapping("/new")
	public MusicDTO add(@RequestBody MusicDTO m) {
		return service.add(m);
	}

	@DeleteMapping("/delete/{id}")
	public void delete(@PathVariable Long id){
		 service.delete(id);
	}

	@GetMapping("/{id}")
	public MusicDTO getById(@PathVariable Long id){
		return service.getById(id);
	}

	@PostMapping("/update/{id}")
	public MusicDTO update(@PathVariable Long id, @RequestBody MusicDTO music){
		return service.add(music);
	}

/*	@PostMapping("/upload")
	public MusicDTO upload(
			@RequestParam("title") String title,
			@RequestParam("artist") String artist,
			@RequestParam("duration") String duration,
			@RequestParam("releasedAt") LocalDate releasedAt,
			@RequestParam("imgFile") MultipartFile imgFile,
			@RequestParam("audioFile") MultipartFile audioFile,
			@RequestParam("tags") List<Tags> tags
	) {
		try {
			storageService.store(imgFile);
			storageService.store(audioFile);
		} catch (IllegalArgumentException e) {
			System.out.println(e.getMessage());
		} catch (IOException e) {
			System.out.println(e.getMessage());
		}
		MusicDTO m = new MusicDTO(title, artist, duration, releasedAt, imgFile.getOriginalFilename(), audioFile.getOriginalFilename(), tags);

		return service.add(m);
	}*/
	
}

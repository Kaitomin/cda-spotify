package com.dreamteam.app.controllers;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

import com.dreamteam.app.entities.Tags;
import com.dreamteam.app.storage.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.web.bind.annotation.*;

import com.dreamteam.app.entities.Music;
import com.dreamteam.app.services.MusicService;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/music")
public class MusicController {
	@Autowired
	private MusicService service;
	@Autowired
	private final StorageService storageService;

	public MusicController(MusicService service, StorageService storageService) {
		this.service = service;
		this.storageService = storageService;
	}

	@GetMapping
	public List<Music> findAll(){
		return service.findAll();
	}
	
	@PostMapping("/new")
	public Music add(@RequestBody Music m) {
		return service.add(m);
	}

	@DeleteMapping("/delete/{id}")
	public void delete(@PathVariable Long id){
		 service.delete(id);
	}

	@GetMapping("/{id}")
	public Music getById(@PathVariable Long id){
		return service.getById(id);
	}

	@PostMapping("/update/{id}")
	public Music update(@PathVariable Long id, @RequestBody Music music){
		return service.update(id, music);
	}

	@PostMapping("/upload")
	public Music upload(
			@RequestParam("title") String title,
			@RequestParam("artist") String artist,
			@RequestParam("duration") String duration,
			@RequestParam("releasedAt") LocalDate releasedAt,
			@RequestParam("imgFile") MultipartFile imgFile,
			@RequestParam("audioFile") MultipartFile audioFile,
			@RequestParam("tags") Set<Tags> tags
	) {
		try {
			storageService.store(imgFile);
			storageService.store(audioFile);
		} catch (IllegalArgumentException e) {
			System.out.println(e.getMessage());
		} catch (IOException e) {
			System.out.println(e.getMessage());
		}
		Music m = new Music(title, artist, duration, releasedAt, imgFile.getOriginalFilename(), audioFile.getOriginalFilename(), tags);

		return service.add(m);
	}
	
}

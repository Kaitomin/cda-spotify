package com.dreamteam.app.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.dreamteam.app.entities.Music;
import com.dreamteam.app.services.MusicService;

@RestController
@RequestMapping("/api/music")
public class MusicController {

	private MusicService service; 
	
	@GetMapping
	public List<Music> findAll(){
		return service.findAll();
	}

	public MusicController(MusicService service) {
		this.service = service;
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
	public Music update(@PathVariable Long id,@RequestBody Music music){
		return service.update(id, music);
	}
	
}

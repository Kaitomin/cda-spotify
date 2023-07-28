package com.dreamteam.app.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
	
}

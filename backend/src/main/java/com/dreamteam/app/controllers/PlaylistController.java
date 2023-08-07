package com.dreamteam.app.controllers;

import com.dreamteam.app.dto.MusicDTO;
import com.dreamteam.app.dto.PlaylistDTO;

import com.dreamteam.app.services.PlaylistService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/playlist")
@RequiredArgsConstructor
public class PlaylistController {
    private final PlaylistService service;

    @GetMapping
    public List<PlaylistDTO> findAll(){
        return service.findAll();
    }
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id){
        service.delete(id);
    }
    @GetMapping("/{id}")
    public PlaylistDTO getById(@PathVariable Long id){
        return service.getById(id);
    }
    @PostMapping("/{playlistId}/addMusic")
    public void addMusic(@PathVariable Long playlistId, @RequestBody MusicDTO musicDTO){
        service.addMusic(playlistId , musicDTO);
    }
    @PostMapping("/{playlistId}/removeMusic/{musicId}")
    public void removeMusic(@PathVariable Long playlistId, @PathVariable Long musicId){
        service.removeMusic(playlistId, musicId);
    }
}

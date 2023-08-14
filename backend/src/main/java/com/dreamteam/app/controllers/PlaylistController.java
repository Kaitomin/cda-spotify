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
@CrossOrigin(origins = "http://localhost:5173")
public class PlaylistController {
    private final PlaylistService service;

    @GetMapping
    public List<PlaylistDTO> findAll(){
        return service.findAll();
    }
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable long id){
        service.delete(id);
    }
    @GetMapping("/{id}")
    public PlaylistDTO getById(@PathVariable long id){
        return service.getById(id);
    }

//    @PostMapping("/update")
//    public PlaylistDTO update(@RequestBody PlaylistDTO p){
//        return service.update(p);
//    }

    @GetMapping("/user/{id}")
    public List<PlaylistDTO> findAllByUserId(@PathVariable long id) {
        return service.findAllByUserId(id);
    }

    @PostMapping("/{playlistId}/addMusic")
    public void addMusic(@PathVariable long playlistId, @RequestBody MusicDTO musicDTO){
        service.addMusic(playlistId , musicDTO);
    }
    @PostMapping("/{playlistId}/removeMusic/{musicId}")
    public void removeMusic(@PathVariable long playlistId, @PathVariable long musicId){
        service.removeMusic(playlistId, musicId);
    }
}

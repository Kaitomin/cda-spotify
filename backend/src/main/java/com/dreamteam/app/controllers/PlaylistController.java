package com.dreamteam.app.controllers;

import com.dreamteam.app.dto.PlaylistDTO;
import com.dreamteam.app.entities.Music;
import com.dreamteam.app.entities.Playlist;
import com.dreamteam.app.services.PlaylistService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/playlist")
@AllArgsConstructor
public class PlaylistController {
    private final PlaylistService service;

    @GetMapping
    public List<PlaylistDTO> findAll(){
        return service.findAll();
    }
    @PostMapping("/new")
    public PlaylistDTO add(@RequestBody PlaylistDTO p) {
        return service.add(p);
    }
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id){
        service.delete(id);
    }
    @GetMapping("/{id}")
    public PlaylistDTO getById(@PathVariable Long id){
        return service.getById(id);
    }
    @PostMapping("/update/{id}")
    public PlaylistDTO update(@PathVariable Long id, @RequestBody PlaylistDTO playlist){
        return service.add(playlist);
    }
}

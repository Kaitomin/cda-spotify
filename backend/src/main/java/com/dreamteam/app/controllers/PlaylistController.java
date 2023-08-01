package com.dreamteam.app.controllers;

import com.dreamteam.app.entities.Music;
import com.dreamteam.app.entities.Playlist;
import com.dreamteam.app.services.PlaylistService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/playlist")
public class PlaylistController {
    private PlaylistService service;
    public PlaylistController(PlaylistService service) {
        this.service = service;
    }

    @GetMapping
    public List<Playlist> findAll(){
        return service.findAll();
    }
    @PostMapping("/new")
    public Playlist add(@RequestBody Playlist p) {
        return service.add(p);
    }
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id){
        service.delete(id);
    }
    @GetMapping("/{id}")
    public Playlist getById(@PathVariable Long id){
        return service.getById(id);
    }
    @PostMapping("/update/{id}")
    public Playlist update(@PathVariable Long id,@RequestBody Playlist playlist){
        return service.update(id, playlist);
    }




}

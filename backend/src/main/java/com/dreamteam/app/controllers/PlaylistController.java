package com.dreamteam.app.controllers;

import com.dreamteam.app.dto.MusicDTO;
import com.dreamteam.app.dto.PlaylistDTO;

import com.dreamteam.app.services.PlaylistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/playlist")
@RequiredArgsConstructor
public class PlaylistController {
    private final PlaylistService service;

    @GetMapping
    public ResponseEntity<List<PlaylistDTO>> findAll(){
        return ResponseEntity.ok(service.findAll());
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable long id){
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<PlaylistDTO> getById(@PathVariable long id){
        return ResponseEntity.ok(service.getById(id));
    }

//    @PostMapping("/update")
//    public PlaylistDTO update(@RequestBody PlaylistDTO p){
//        return service.update(p);
//    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<PlaylistDTO>> findAllByUserId(@PathVariable long id) {
        return new ResponseEntity<>(service.findAllByUserId(id), HttpStatus.OK);
    }

    @PostMapping("/{playlistId}/addMusic")
    public ResponseEntity<Void> addMusic(@PathVariable long playlistId, @RequestBody MusicDTO musicDTO){
        service.addMusic(playlistId , musicDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PostMapping("/{playlistId}/removeMusic/{musicId}")
    public ResponseEntity<Void> removeMusic(@PathVariable long playlistId, @PathVariable long musicId){
        service.removeMusic(playlistId, musicId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

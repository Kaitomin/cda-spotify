package com.dreamteam.app.controllers;


import com.dreamteam.app.dto.PlaylistDTO;
import com.dreamteam.app.dto.UserDTO;
import com.dreamteam.app.services.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController  {
    private final UserServiceImpl service;

    @GetMapping
    public ResponseEntity<List<UserDTO>> findAll(){
        return ResponseEntity.ok(service.findAll());
    }
    @PostMapping("/new")
    public ResponseEntity<UserDTO> add(@RequestBody UserDTO u) {
        return ResponseEntity.ok(service.add(u));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable long id){
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getById(@PathVariable long id){
        return ResponseEntity.ok(service.getById(id));
    }
    @PostMapping("/{userId}/addPlaylist")
    public ResponseEntity<Void> addPlaylistByUser(@PathVariable long userId, @RequestBody PlaylistDTO playlistDTO){
        service.addPlaylistByUser(userId, playlistDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PostMapping("/{userId}/updatePlaylist")
    public ResponseEntity<Void> updatePlaylistByUser(@PathVariable long userId, @RequestBody PlaylistDTO playlistDTO){
        service.updatePlaylistByUser(userId, playlistDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PostMapping("/update/{id}")
    public ResponseEntity<UserDTO> update(@PathVariable long id,@RequestBody UserDTO user){
        return ResponseEntity.ok(service.add(user));
    }
    @PostMapping("/{userId}/deletePlaylist/{playlistId}")
    public ResponseEntity<Void> deletePlaylistByUser(@PathVariable long userId,@PathVariable long playlistId){
        service.deletePlaylistByUser(userId, playlistId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}

package com.dreamteam.app.controllers;


import com.dreamteam.app.dto.PlaylistDTO;
import com.dreamteam.app.dto.UserDTO;
import com.dreamteam.app.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@AllArgsConstructor
public class UserController  {
    private final UserService service;

    @GetMapping
    public List<UserDTO> findAll(){
        return service.findAll();
    }
    @PostMapping("/new")
    public UserDTO add(@RequestBody UserDTO u) {
        return service.add(u);
    }
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable long id){
        service.delete(id);
    }
    @GetMapping("/{id}")
    public UserDTO getById(@PathVariable long id){
        return service.getById(id);
    }
    @PostMapping("/{userId}/addPlaylist")
    public void addPlaylistByUser(@PathVariable long userId, @RequestBody PlaylistDTO playlistDTO){
        service.addPlaylistByUser(userId, playlistDTO);
    }
    @PostMapping("/update/{id}")
    public UserDTO update(@PathVariable long id,@RequestBody UserDTO user){
        return service.add(user);
    }
    @PostMapping("/{userId}/deletePlaylist/{playlistId}")
    public void deletePlaylistByUser(@PathVariable long userId,@PathVariable long playlistId){
        service.deletePlaylistByUser(userId, playlistId);
    }

}

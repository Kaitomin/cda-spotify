package com.dreamteam.app.controllers;


import com.dreamteam.app.dto.UserDTO;
import com.dreamteam.app.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController  {
    private UserService service;
    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping
    public List<UserDTO> findAll(){
        return service.findAll();
    }
    @PostMapping("/new")
    public UserDTO add(@RequestBody UserDTO u) {
        return service.add(u);
    }
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id){
        service.delete(id);
    }
    @GetMapping("/{id}")
    public UserDTO getById(@PathVariable Long id){
        return service.getById(id);
    }
    @PostMapping("/update/{id}")
    public UserDTO update(@PathVariable Long id,@RequestBody UserDTO user){
        return service.add(user);
    }

}

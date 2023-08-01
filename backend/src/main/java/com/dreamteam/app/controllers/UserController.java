package com.dreamteam.app.controllers;


import com.dreamteam.app.entities.User;
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
    public List<User> findAll(){
        return service.findAll();
    }
    @PostMapping("/new")
    public User add(@RequestBody User u) {
        return service.add(u);
    }
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id){
        service.delete(id);
    }
    @GetMapping("/{id}")
    public User getById(@PathVariable Long id){
        return service.getById(id);
    }
    @PostMapping("/update/{id}")
    public User update(@PathVariable Long id,@RequestBody User user){
        return service.update(id, user);
    }

}

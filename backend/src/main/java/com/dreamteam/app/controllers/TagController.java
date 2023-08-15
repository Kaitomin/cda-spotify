package com.dreamteam.app.controllers;

import com.dreamteam.app.enums.Tag;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/tag")
@CrossOrigin(origins = "http://localhost:5173")
public class TagController {
    @GetMapping
    public List<Tag> findAll() {
        List<Tag> tags = Arrays.asList(Tag.values());
        return tags;
    }
}

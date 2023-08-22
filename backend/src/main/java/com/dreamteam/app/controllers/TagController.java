package com.dreamteam.app.controllers;

import com.dreamteam.app.enums.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/tag")
public class TagController {
    @GetMapping
    public ResponseEntity<List<Tag>> findAll() {
        return ResponseEntity.ok(Arrays.asList(Tag.values()));
    }
}

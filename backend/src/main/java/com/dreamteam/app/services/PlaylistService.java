package com.dreamteam.app.services;

import java.util.List;
import java.util.Optional;

import com.dreamteam.app.entities.Playlist;
import com.dreamteam.app.repositories.PlaylistRepository;
import org.springframework.stereotype.Service;

import com.dreamteam.app.entities.Music;
import com.dreamteam.app.repositories.MusicRepository;

import lombok.RequiredArgsConstructor;

@Service
public class PlaylistService {

    private PlaylistRepository repository;

    public List<Playlist> findAll(){
        return repository.findAll();
    }

    public PlaylistService(PlaylistRepository repository) {
        this.repository = repository;
    }

    public Playlist add(Playlist p) {
        return repository.save(p);
    }

    public void delete(Long id){ repository.deleteById(id); }

    public Playlist getById(Long id) {
        Optional<Playlist> playlistOptional = repository.findById(id);
        return playlistOptional.map( m -> m).orElse(null);
    }

    public  Playlist update(Long id, Playlist playlist){
        Playlist p = repository.findById(id).orElse(null);
        if(p != null){
            return repository.save(playlist);
        }
        return null;

    }


}

package com.dreamteam.app.services;

import java.util.List;

import com.dreamteam.app.dto.PlaylistDTO;
import com.dreamteam.app.entities.Playlist;
import com.dreamteam.app.repositories.PlaylistRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class PlaylistService {
    private final PlaylistRepository repository;
    private final ModelMapper mapper;

    public List<PlaylistDTO> findAll(){
        return repository.findAll().stream().map(playlist -> mapper.map(playlist, PlaylistDTO.class)).toList();
    }
    public PlaylistDTO add(PlaylistDTO p) {
        return mapper.map(repository.save(mapper.map(p, Playlist.class)), PlaylistDTO.class);
    }
    public void delete(Long id){ repository.deleteById(id); }
    public PlaylistDTO getById(Long id) {
        return repository.findById(id).map(playlist -> mapper.map(playlist, PlaylistDTO.class)).orElse(null);
    }

}

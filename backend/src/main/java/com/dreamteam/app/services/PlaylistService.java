package com.dreamteam.app.services;

import java.util.List;
import java.util.Optional;

import com.dreamteam.app.dto.PlaylistDTO;
import com.dreamteam.app.entities.Playlist;
import com.dreamteam.app.mappers.PlaylistMapper;
import com.dreamteam.app.repositories.PlaylistRepository;
import org.springframework.stereotype.Service;

@Service
public class PlaylistService {
    private final PlaylistRepository repository;

    private final PlaylistMapper mapper;

    public List<PlaylistDTO> findAll(){
        return repository.findAll().stream().map(mapper::toDto).toList();
    }

    public PlaylistService(PlaylistRepository repository, PlaylistMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public PlaylistDTO add(PlaylistDTO p) {
        return mapper.toDto(repository.save(mapper.toEntity(p)));
    }

    public void delete(Long id){ repository.deleteById(id); }

    public PlaylistDTO getById(Long id) {
        return repository.findById(id).map(mapper::toDto).orElse(null);
    }

}

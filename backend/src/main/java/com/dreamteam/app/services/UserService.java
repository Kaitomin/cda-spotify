package com.dreamteam.app.services;

import com.dreamteam.app.dto.PlaylistDTO;
import com.dreamteam.app.dto.UserDTO;
import com.dreamteam.app.entities.Playlist;
import com.dreamteam.app.entities.User;
import com.dreamteam.app.mappers.PlaylistMapper;
import com.dreamteam.app.mappers.UserMapper;
import com.dreamteam.app.repositories.PlaylistRepository;
import com.dreamteam.app.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository repository;
    private final PlaylistRepository playlistRepository;
    private final UserMapper mapper;
    private final PlaylistMapper playlistMapper;

    public List<UserDTO> findAll(){
        return repository.findAll().stream().map(mapper::toDto).toList();
    }

    public UserService(UserRepository repository, PlaylistRepository playlistRepository, UserMapper mapper, PlaylistMapper playlistMapper) {
        this.repository = repository;
        this.playlistRepository = playlistRepository;
        this.mapper = mapper;
        this.playlistMapper = playlistMapper;
    }

    public UserDTO add(UserDTO u) {
        return mapper.toDto(repository.save(mapper.toEntity(u)));
    }

    public void delete(Long id){ repository.deleteById(id); }

    public UserDTO getById(Long id) {
        return repository.findById(id).map(mapper::toDto).orElse(null);
    }

    public void addPlaylistByUser(Long id, PlaylistDTO playlistDTO){
        repository.findById(id).ifPresent(user->{
            List<Playlist> userPlaylists = user.getPlaylists();
            userPlaylists.add(playlistMapper.toEntity(playlistDTO));
            user.setPlaylists(userPlaylists);
            repository.save(user);
        });

    }


/*    public UserDTO updatePlaylistByUser(Long id, Long playlistId, PlaylistDTO playlistDTO){
        User user = repository.findById(id).orElse(null);
        if(si c'est bien la gas co'){

            playlistRepository.save(playlistMapper.toEntity(playlistDTO));

        }

    }*/




}

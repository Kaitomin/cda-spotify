package com.dreamteam.app.services;

import com.dreamteam.app.dto.PlaylistDTO;
import com.dreamteam.app.dto.UserDTO;
import com.dreamteam.app.entities.Playlist;
import com.dreamteam.app.entities.User;
import com.dreamteam.app.mappers.PlaylistMapper;
import com.dreamteam.app.mappers.UserMapper;
import com.dreamteam.app.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private UserRepository repository;
    private final UserMapper mapper;
    private final PlaylistMapper playlistMapper;

    public List<UserDTO> findAll(){
        return repository.findAll().stream().map(mapper::toDto).toList();
    }

    public UserService(UserRepository repository, UserMapper mapper, PlaylistMapper playlistMapper) {
        this.repository = repository;
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

    public UserDTO addPlaylistByUser(Long id, PlaylistDTO playlistDTO){
        User user = repository.findById(id).orElse(null);
        if (user != null){
            List<Playlist> userPlaylists = user.getPlaylists();
            userPlaylists.add(playlistMapper.toEntity(playlistDTO));
            user.setPlaylists(userPlaylists);
            return mapper.toDto(repository.save(user));
        }
        return null;
    }

}

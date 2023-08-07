package com.dreamteam.app.services;

import com.dreamteam.app.dto.PlaylistDTO;
import com.dreamteam.app.dto.UserDTO;
import com.dreamteam.app.entities.Playlist;
import com.dreamteam.app.entities.User;
import com.dreamteam.app.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserService {

    private UserRepository repository;
    private final ModelMapper mapper;

    public List<UserDTO> findAll(){
        return repository.findAll().stream().map(user -> mapper.map(user, UserDTO.class)).toList();
    }
    public UserDTO add(UserDTO u) {
        return mapper.map(repository.save(mapper.map(u, User.class)), UserDTO.class);
    }
    public void addPlaylistByUser(Long id, PlaylistDTO playlistDTO){
        repository.findById(id).ifPresent(user->{
            List<Playlist> userPlaylists = user.getPlaylists();
            userPlaylists.add(playlistMapper.toEntity(playlistDTO));
            user.setPlaylists(userPlaylists);
            repository.save(user);
        });

    }
    public void delete(Long id){ repository.deleteById(id); }
    public UserDTO getById(Long id) {
        return repository.findById(id).map(user -> mapper.map(user, UserDTO.class)).orElse(null);
    }
}

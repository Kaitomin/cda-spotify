package com.dreamteam.app.services;

import com.dreamteam.app.dto.PlaylistDTO;
import com.dreamteam.app.dto.UserDTO;
import com.dreamteam.app.entities.Playlist;
import com.dreamteam.app.entities.User;
import com.dreamteam.app.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repository;
    private final ModelMapper mapper;
    private final PlaylistService playlistService;

    public List<UserDTO> findAll(){
        return repository.findAll().stream().map(user -> mapper.map(user, UserDTO.class)).toList();
    }
    public UserDTO add(UserDTO u) {
        PlaylistDTO playlistDTO = new PlaylistDTO();
        playlistDTO.setName("Favoris");
        playlistDTO.setCreatedAt(LocalDate.now());
        playlistDTO.setMusics(Collections.emptyList());

        List<Playlist> playlists = new ArrayList<>();
        playlists.add(mapper.map(playlistDTO, Playlist.class));
        u.setPlaylists(playlists);
        return mapper.map(repository.save(mapper.map(u, User.class)), UserDTO.class);
    }
    public void addPlaylistByUser(long userId, PlaylistDTO playlistDTO){
        // Can not add another playlist named "Favoris"
        if (playlistDTO.getName().equals("Favoris")) return;

        playlistDTO.setCreatedAt(LocalDate.now());
        playlistDTO.setMusics(Collections.emptyList());

        repository.findById(userId).ifPresent(user -> {
            List<Playlist> userPlaylists = user.getPlaylists();
            userPlaylists.add(mapper.map(playlistDTO, Playlist.class));
            user.setPlaylists(userPlaylists);
            repository.save(user);
        });

    }
    public void deletePlaylistByUser (long userId, long playlistId){
        // Can not delete playlist "Favoris"
        if (playlistService.getById(playlistId).getName().equals("Favoris")) return;

        repository.findById(userId).ifPresent(user -> {
            List<Playlist> playlists = user.getPlaylists();
            playlists = playlists.stream()
                    .filter(playlist -> playlist.getId() != playlistId)
                    .collect(Collectors.toList());
            user.setPlaylists(playlists);
            playlistService.delete(playlistId);
            repository.save(user);
        });
    }
    public void updatePlaylistByUser (long userId, PlaylistDTO playlistDTO){
        // Can not update playlist "Favoris"
        if (playlistDTO.getName().equals("Favoris")) return;

        repository.findById(userId).ifPresent(user -> {
            List<Playlist> playlists = user.getPlaylists();
            playlists.stream()
                    .filter(playlist -> playlist.getId() == playlistDTO.getId())
                    .findFirst().ifPresent(playlistFound -> playlistService.update(playlistDTO));
        });
    }

    public void delete(long id){ repository.deleteById(id); }
    public UserDTO getById(long id) {
        return repository.findById(id).map(user -> mapper.map(user, UserDTO.class)).orElse(null);
    }
}

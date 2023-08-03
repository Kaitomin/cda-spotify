package com.dreamteam.app.services;

import java.util.List;
import java.util.stream.Collectors;

import com.dreamteam.app.dto.MusicDTO;
import com.dreamteam.app.dto.PlaylistDTO;
import com.dreamteam.app.dto.UserDTO;
import com.dreamteam.app.entities.Music;
import com.dreamteam.app.entities.Playlist;
import com.dreamteam.app.entities.User;
import com.dreamteam.app.mappers.MusicMapper;
import com.dreamteam.app.mappers.PlaylistMapper;
import com.dreamteam.app.repositories.PlaylistRepository;
import org.springframework.stereotype.Service;

@Service
public class PlaylistService {

    private final PlaylistRepository repository;
    private final UserService userService;

    private final PlaylistMapper mapper;
    private final MusicMapper musicMapper;

    public List<PlaylistDTO> findAll(){
        return repository.findAll().stream().map(mapper::toDto).toList();
    }

    public PlaylistService(PlaylistRepository repository, UserService userService, PlaylistMapper mapper, MusicMapper musicMapper) {
        this.repository = repository;
        this.userService = userService;
        this.mapper = mapper;
        this.musicMapper = musicMapper;
    }

    public PlaylistDTO add(PlaylistDTO p) {
        throw new RuntimeException("Not implemented");
    }

    public void delete(Long id){ repository.deleteById(id); }

    public PlaylistDTO getById(Long id) {
        //Optional<PlaylistDTO> playlistOptional = repository.findById(id);
        //return playlistOptional.map( m -> m).orElse(null);
        return repository.findById(id).map(mapper::toDto).orElse(null);
    }


    public PlaylistDTO addMusic(Long id, MusicDTO musicDTO){
        Playlist playlist = repository.findById(id).orElse(null);
        if (playlist != null){
            List<Music> playslistMusics = playlist.getMusics();
            playslistMusics.add(musicMapper.toEntity(musicDTO));
            playlist.setMusics(playslistMusics);
            return mapper.toDto(repository.save(playlist));

        }
        return null;
    }
    public void removeMusic(Long playlistId, Long musicId){

        repository.findById(playlistId).ifPresent(playlist->{
            List<Music> musics = playlist.getMusics();

            musics = musics.stream()
                    .filter(music -> music.getId() != musicId)
                    .toList();
            playlist.setMusics(musics);
            repository.save(playlist);
        });

    }




}

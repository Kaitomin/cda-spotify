package com.dreamteam.app.services;

import java.util.List;
import java.util.stream.Collectors;

import com.dreamteam.app.dto.MusicDTO;
import com.dreamteam.app.dto.PlaylistDTO;
import com.dreamteam.app.entities.Music;
import com.dreamteam.app.entities.Playlist;
import com.dreamteam.app.repositories.PlaylistRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PlaylistService {
    private final PlaylistRepository repository;
    private final ModelMapper mapper;

    public List<PlaylistDTO> findAll(){
        return repository.findAll().stream().map(playlist -> mapper.map(playlist, PlaylistDTO.class)).toList();
    }
    public PlaylistDTO addMusic(Long id, MusicDTO musicDTO){
        Playlist playlist = repository.findById(id).orElse(null);
        if (playlist != null){
            List<Music> playlistMusics = playlist.getMusics();
            playlistMusics.add(mapper.map(musicDTO, Music.class));
            playlist.setMusics(playlistMusics);
            return mapper.map(repository.save(playlist), PlaylistDTO.class);
        }
        return null;
    }
    public void removeMusic(Long playlistId, Long musicId){
        repository.findById(playlistId).ifPresent(playlist -> {
            List<Music> musics = playlist.getMusics();

            musics = musics.stream()
                    .filter(music -> music.getId() != musicId)
                    .collect(Collectors.toList());
            playlist.setMusics(musics);
            repository.save(playlist);
        });
    }
    public void delete(Long id){ repository.deleteById(id); }
    public PlaylistDTO getById(Long id) {
        return repository.findById(id).map(playlist -> mapper.map(playlist, PlaylistDTO.class)).orElse(null);
    }
}

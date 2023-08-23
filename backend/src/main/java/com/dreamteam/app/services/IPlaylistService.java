package com.dreamteam.app.services;

import com.dreamteam.app.dto.MusicDTO;
import com.dreamteam.app.dto.PlaylistDTO;

import java.util.List;

public interface IPlaylistService {
    PlaylistDTO update(PlaylistDTO p);
    List<PlaylistDTO> findAll();
    PlaylistDTO addMusic(long id, MusicDTO musicDTO);
    List<PlaylistDTO> findAllByUserId(long id);
    void removeMusic(long playlistId, long musicId);
    void delete(long id);
    PlaylistDTO getById(long id);
}

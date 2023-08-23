package com.dreamteam.app.services;

import com.dreamteam.app.dto.PlaylistDTO;
import com.dreamteam.app.dto.UserDTO;

import java.util.List;

public interface IUserService {
    List<UserDTO> findAll();
    UserDTO add(UserDTO u);
    void addPlaylistByUser(long userId, PlaylistDTO playlistDTO);
    void deletePlaylistByUser (long userId, long playlistId);
    void updatePlaylistByUser (long userId, PlaylistDTO playlistDTO);
    void delete(long id);
    UserDTO getById(long id);
}

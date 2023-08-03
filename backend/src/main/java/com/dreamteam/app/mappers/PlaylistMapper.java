package com.dreamteam.app.mappers;

import com.dreamteam.app.dto.PlaylistDTO;
import com.dreamteam.app.entities.Playlist;
import org.mapstruct.Mapper;

@Mapper
public interface PlaylistMapper {
    Playlist toEntity(PlaylistDTO dto);

    PlaylistDTO toDto(Playlist entity);
}

package com.dreamteam.app.mappers;

import com.dreamteam.app.dto.MusicDTO;
import com.dreamteam.app.entities.Music;
import org.mapstruct.Mapper;

@Mapper
public interface MusicMapper {

    Music toEntity(MusicDTO dto);
    MusicDTO toDto(Music entity);


}

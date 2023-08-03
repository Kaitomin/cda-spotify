package com.dreamteam.app.mappers;

import com.dreamteam.app.dto.UserDTO;
import com.dreamteam.app.entities.User;
import org.mapstruct.Mapper;

@Mapper
public interface UserMapper {
    User toEntity(UserDTO dto);

    UserDTO toDto(User entity);
}

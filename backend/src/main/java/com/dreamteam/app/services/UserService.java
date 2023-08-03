package com.dreamteam.app.services;

import com.dreamteam.app.dto.UserDTO;
import com.dreamteam.app.mappers.UserMapper;
import com.dreamteam.app.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private UserRepository repository;
    private final UserMapper mapper;

    public List<UserDTO> findAll(){
        return repository.findAll().stream().map(mapper::toDto).toList();
    }

    public UserService(UserRepository repository, UserMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public UserDTO add(UserDTO u) {
        return mapper.toDto(repository.save(mapper.toEntity(u)));
    }

    public void delete(Long id){ repository.deleteById(id); }

    public UserDTO getById(Long id) {
        return repository.findById(id).map(mapper::toDto).orElse(null);
    }

}

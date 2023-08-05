package com.dreamteam.app.services;

import com.dreamteam.app.dto.UserDTO;
import com.dreamteam.app.entities.User;
import com.dreamteam.app.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository repository;
    private final ModelMapper mapper;

    public List<UserDTO> findAll(){
        return repository.findAll().stream().map(user -> mapper.map(user, UserDTO.class)).toList();
    }
    public UserDTO add(UserDTO u) {
        return mapper.map(repository.save(mapper.map(u, User.class)), UserDTO.class);
    }
    public void delete(Long id){ repository.deleteById(id); }
    public UserDTO getById(Long id) {
        return repository.findById(id).map(user -> mapper.map(user, UserDTO.class)).orElse(null);
    }
}

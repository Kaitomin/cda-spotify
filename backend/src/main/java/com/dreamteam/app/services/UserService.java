package com.dreamteam.app.services;

import com.dreamteam.app.entities.Playlist;
import com.dreamteam.app.entities.User;
import com.dreamteam.app.repositories.PlaylistRepository;
import com.dreamteam.app.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private UserRepository repository;

    public List<User> findAll(){
        return repository.findAll();
    }

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public User add(User u) {
        return repository.save(u);
    }

    public void delete(Long id){ repository.deleteById(id); }

    public User getById(Long id) {
        Optional<User> userOptional = repository.findById(id);
        return userOptional.map( m -> m).orElse(null);
    }

    public  User update(Long id, User user){
        User p = repository.findById(id).orElse(null);
        if(p != null){
            return repository.save(user);
        }
        return null;

    }

}

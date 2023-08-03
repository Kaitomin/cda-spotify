package com.dreamteam.app;

import com.dreamteam.app.dto.MusicDTO;
import com.dreamteam.app.entities.Music;
import com.dreamteam.app.entities.Tags;
import com.dreamteam.app.mappers.MusicMapper;
import com.dreamteam.app.repositories.MusicRepository;
import com.dreamteam.app.services.MusicService;

import static org.hamcrest.MatcherAssert.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class MusicServiceTest {

    @Mock
    private MusicMapper musicMapper;
    @Mock
    private MusicRepository repository;
    private MusicService service;

    @BeforeEach
    public void setup(){
        service = new MusicService(repository, musicMapper);
    }

    @Test
    public void findById_shouldReturnMusic() {
        Music m = new Music(25, "Waka Waka","shakira","2,25", LocalDate.of(1985,6,15),"/pas las","/pas la", Arrays.asList(Tags.POP, Tags.ADRIEN));


        when(repository.findById(25L)).thenReturn(Optional.of(m));
        assertEquals(musicMapper.toDto(m), service.getById(25L));
    }

    @Test
    public void findByIdNotFound_shouldReturnNull() {

        when(repository.findById(8L)).thenReturn(Optional.empty());
        assertNull(service.getById(8L));
    }

    @Test
    public void deleteById_shouldCallRepository() {
            service.delete(any());
            verify(repository).deleteById(any());

        }

    @Test
    public void findAll_shouldReturnMusic() {
        Music m = new Music(25, "Waka Waka","shakira","2,25", LocalDate.of(1985,6,15),"/pas las","/pas la", Arrays.asList(Tags.POP, Tags.ADRIEN));
        List<Music> ml = new ArrayList<>();
        ml.add(m);
        when(repository.findAll()).thenReturn(ml);

        assertEquals(ml.stream().map(musicMapper::toDto).toList(), service.findAll());
        verify(repository,times(1) ).findAll();
    }

    @Test
    public void addMusic_should(){
        Music m = new Music(25, "Waka Waka", "shakira", "2,25", LocalDate.of(1985, 6, 15), "/pas las", "/pas la", Arrays.asList(Tags.POP, Tags.ADRIEN));

        //MusicDTO mDto = musicMapper.toDto(m);

        when(repository.save(any())).thenReturn(m);
        assertEquals(musicMapper.toDto(m), service.add(musicMapper.toDto(m)));
        
        verify(repository, times(1)).save(any());

    }





}



































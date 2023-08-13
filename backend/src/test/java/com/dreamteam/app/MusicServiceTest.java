package com.dreamteam.app;

import com.dreamteam.app.dto.MusicDTO;
import com.dreamteam.app.entities.Music;
import com.dreamteam.app.enums.Tag;
import com.dreamteam.app.repositories.MusicRepository;
import com.dreamteam.app.services.MusicService;

import static org.hamcrest.MatcherAssert.assertThat;

import com.dreamteam.app.storage.StorageService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;
import org.springframework.mock.web.MockMultipartFile;

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
    private ModelMapper musicMapper;
    @Mock
    private MusicRepository repository;
    @Mock
    private StorageService storageService;
    private MusicService service;

    @BeforeEach
    public void setup(){
        service = new MusicService(repository, musicMapper, storageService);
    }

    @Test
    public void findById_shouldReturnMusic() {
        Music m = new Music(25, "Waka Waka","shakira","2,25", LocalDate.of(1985,6,15),"/pas las","/pas la", Arrays.asList(Tag.POP, Tag.ADRIEN));


        when(repository.findById(25L)).thenReturn(Optional.of(m));
        assertEquals(musicMapper.map(m, MusicDTO.class), service.getById(25L));
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
        Music m = new Music(25, "Waka Waka","shakira","2,25", LocalDate.of(1985,6,15),"/pas las","/pas la", Arrays.asList(Tag.POP, Tag.ADRIEN));
        List<Music> ml = new ArrayList<>();
        ml.add(m);
        when(repository.findAll()).thenReturn(ml);

        assertEquals(ml.stream().map(music -> musicMapper.map(music, MusicDTO.class)).toList(), service.findAll());
        verify(repository,times(1) ).findAll();
    }

    @Test
    public void addMusic_shouldReturnMusic(){
        Music m = new Music(25, "Waka Waka", "shakira", "2,25", LocalDate.of(1985, 6, 15), "imgFile", "audioFile", Arrays.asList(Tag.POP, Tag.ADRIEN));
        MockMultipartFile imgFile = new MockMultipartFile("imgFile", "imgFile", null, "img".getBytes());
        MockMultipartFile audioFile = new MockMultipartFile("audioFile", "audioFile", null, "audio".getBytes());

        when(musicMapper.map(m, MusicDTO.class)).thenReturn(new MusicDTO());
        when(repository.save(any())).thenReturn(m);

        MusicDTO mDto = musicMapper.map(m, MusicDTO.class);
        mDto.setId(m.getId());
        mDto.setTitle(m.getTitle());
        mDto.setArtist(m.getArtist());
        mDto.setDuration(m.getDuration());
        mDto.setReleasedAt(m.getReleasedAt());
        mDto.setImgUri(m.getImgUri());
        mDto.setAudioUri(m.getAudioUri());
        mDto.setTags(m.getTags());

        assertEquals(mDto, service.add(musicMapper.map(m, MusicDTO.class), imgFile, audioFile, null));

        verify(repository, times(1)).save(any());

    }
}



































package com.dreamteam.app;

import com.dreamteam.app.dto.MusicDTO;
import com.dreamteam.app.entities.Music;
import com.dreamteam.app.enums.Tag;
import com.dreamteam.app.repositories.MusicRepository;
import com.dreamteam.app.services.MusicServiceImpl;
import com.dreamteam.app.storage.StorageService;
import org.jaudiotagger.audio.exceptions.CannotReadException;
import org.jaudiotagger.audio.exceptions.InvalidAudioFrameException;
import org.jaudiotagger.audio.exceptions.ReadOnlyFileException;
import org.jaudiotagger.tag.TagException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;
import org.springframework.mock.web.MockMultipartFile;

import java.io.IOException;
import java.text.ParseException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.MatcherAssert.assertThat;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
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
    private MusicServiceImpl service;

    @BeforeEach
    public void setup(){
        service = new MusicServiceImpl(repository, musicMapper, storageService);
    }

    @Test
//    @Disabled
    public void findById_shouldReturnMusic() {
        Music m = new Music(25, "Waka Waka","shakira","2,25", LocalDate.of(1985,6,15),"/pas las","/pas la", Arrays.asList(Tag.POP, Tag.ROCK), 2);
        when(repository.findById(25L)).thenReturn(Optional.of(m));
        assertEquals(musicMapper.map(m, MusicDTO.class), service.getById(25L));
    }

    @Test
//    @Disabled
    public void findByIdNotFound_shouldReturnNull() {
        when(repository.findById(8L)).thenReturn(Optional.empty());
        assertNull(service.getById(8L));
    }

    @Test
//    @Disabled
    public void deleteById_shouldCallRepository() throws IOException {
        Music m = new Music(25L, "Waka Waka","shakira","2,25", LocalDate.of(1985,6,15),"/pas las","/pas la", Arrays.asList(Tag.POP, Tag.ROCK), 2);
        when(repository.findById(25L)).thenReturn(Optional.of(m));
        service.delete(25L);
        verify(repository).deleteById(25L);

    }

    @Test
//    @Disabled
    public void findAll_shouldReturnMusic() {
        Music m = new Music(25, "Waka Waka","shakira","2,25", LocalDate.of(1985,6,15),"/pas las","/pas la", Arrays.asList(Tag.POP, Tag.ROCK), 2);
        List<Music> ml = new ArrayList<>();
        ml.add(m);

        when(repository.findAll()).thenReturn(ml);
        assertEquals(ml.stream().map(music -> musicMapper.map(music, MusicDTO.class)).toList(), service.findAll());
        verify(repository,times(1) ).findAll();
    }

    @Test
    @Disabled
    public void addMusic_shouldReturnMusic() throws CannotReadException, TagException, InvalidAudioFrameException, ReadOnlyFileException, IOException, ParseException {
        Music m = new Music(25, "Waka Waka", "shakira", "2,25", LocalDate.of(1985, 6, 15), "imgFile", "audioFile", Arrays.asList(Tag.POP, Tag.ROCK), 2);
        MockMultipartFile imgFile = new MockMultipartFile("imgFile.jpg", "imgFile.jpg", null, "img".getBytes());
        MockMultipartFile audioFile = new MockMultipartFile("audioFile.mp3", "audioFile.mp3", null, "audio".getBytes());


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

        assertEquals(mDto, service.add(musicMapper.map(m, MusicDTO.class), imgFile, audioFile));

        verify(repository, times(1)).save(any());

    }
}



































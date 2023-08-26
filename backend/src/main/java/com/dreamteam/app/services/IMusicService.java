package com.dreamteam.app.services;

import com.dreamteam.app.dto.MusicDTO;
import com.dreamteam.app.enums.Tag;
import com.dreamteam.app.exceptions.MusicException;
import org.jaudiotagger.audio.exceptions.CannotReadException;
import org.jaudiotagger.audio.exceptions.InvalidAudioFrameException;
import org.jaudiotagger.audio.exceptions.ReadOnlyFileException;
import org.jaudiotagger.tag.TagException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.ParseException;
import java.util.List;

public interface IMusicService {
    List<MusicDTO> findAll();
    List<MusicDTO> searchMusic(String searchKey);
    List<MusicDTO> searchMusicByTitle(String searchKey);
    List<MusicDTO> searchMusicByArtist(String searchKey);
    MusicDTO add(
            MusicDTO mDto,
            MultipartFile imgFile,
            MultipartFile audioFile
    ) throws IOException, CannotReadException, TagException, InvalidAudioFrameException, ReadOnlyFileException, ParseException;

    MusicDTO update(
            MusicDTO mDto,
            MultipartFile imgFile,
            MultipartFile audioFile,
            long id
    ) throws IOException, CannotReadException, TagException, InvalidAudioFrameException, ReadOnlyFileException, ParseException, MusicException;
    void delete(long id) throws IOException;
    MusicDTO getById(long id);
    List<MusicDTO> getTop10ByTags(Tag tag);
    List<MusicDTO> getTop10ByArtist(String artist);
}

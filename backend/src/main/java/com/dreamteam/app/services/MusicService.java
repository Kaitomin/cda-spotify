package com.dreamteam.app.services;

import java.io.File;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import com.dreamteam.app.dto.MusicDTO;
import com.dreamteam.app.entities.Music;
import com.dreamteam.app.storage.StorageService;
import com.dreamteam.app.utils.CustomUtils;
import lombok.RequiredArgsConstructor;
import org.jaudiotagger.audio.AudioFile;
import org.jaudiotagger.audio.AudioFileIO;
import org.jaudiotagger.audio.exceptions.CannotReadException;
import org.jaudiotagger.audio.exceptions.InvalidAudioFrameException;
import org.jaudiotagger.audio.exceptions.ReadOnlyFileException;
import org.jaudiotagger.tag.TagException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.dreamteam.app.repositories.MusicRepository;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class MusicService {
	private final MusicRepository repository;
	private final ModelMapper mapper;
	private final StorageService storageService;
	
	public List<MusicDTO> findAll(){
		return repository.findAll().stream().map(music -> mapper.map(music, MusicDTO.class)).toList();
	}

	public MusicDTO add(MusicDTO mDto, MultipartFile imgFile, MultipartFile audioFile) throws IOException, CannotReadException, TagException, InvalidAudioFrameException, ReadOnlyFileException, ParseException {
		String imgUuid = storageService.store(imgFile);
		String audioUuid = storageService.store(audioFile);

		String duration = CustomUtils.getDuration(audioFile);

		mDto.setDuration(duration);
		mDto.setImgUri(imgUuid);
		mDto.setAudioUri(audioFile.getOriginalFilename());
		return mapper.map(repository.save(mapper.map(mDto, Music.class)), MusicDTO.class);
	}

	public MusicDTO update(MusicDTO mDto, MultipartFile imgFile, MultipartFile audioFile, long id) throws IOException, CannotReadException, TagException, InvalidAudioFrameException, ReadOnlyFileException, ParseException {
		if (repository.findById(id).orElse(null) != null) {
			Music m = repository.findById(id).orElse(null);

			mDto.setId(id);
			mDto.setDuration(m.getDuration());

			// Check if new image file is uploaded
			if (imgFile == null) mDto.setImgUri(m.getImgUri());
			else {
				String imgUuid = storageService.store(imgFile);
				storageService.deleteFile(m.getImgUri()); // Delete previous img file
				mDto.setImgUri(imgUuid);
			}

			// Check if new audio file is uploaded
			if (audioFile == null || (audioFile.getOriginalFilename().equals(m.getAudioUri()))) mDto.setAudioUri(m.getAudioUri());
			else {
				String audioUuid = storageService.store(audioFile);
				String duration = CustomUtils.getDuration(audioFile);
				storageService.deleteFile(m.getAudioUri()); // Delete previous audio file

				mDto.setDuration(duration);
				mDto.setAudioUri(audioFile.getOriginalFilename());
			}
			return mapper.map(repository.save(mapper.map(mDto, Music.class)), MusicDTO.class);
		}
		return null;
	}
	public void delete(long id){
		Music m = repository.findById(id).orElse(null);
		storageService.deleteFile(m.getImgUri());
		storageService.deleteFile(m.getAudioUri());
		repository.deleteById(id);
	}
	public MusicDTO getById(long id) {
		return repository.findById(id).map(music -> mapper.map(music, MusicDTO.class)).orElse(null);
	}
}

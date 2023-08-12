package com.dreamteam.app.services;

import java.io.File;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import com.dreamteam.app.dto.MusicDTO;
import com.dreamteam.app.entities.Music;
import com.dreamteam.app.storage.StorageService;
import lombok.RequiredArgsConstructor;
import org.jaudiotagger.audio.AudioFile;
import org.jaudiotagger.audio.AudioFileIO;
import org.jaudiotagger.audio.AudioHeader;
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
	public MusicDTO add(MusicDTO mDto, MultipartFile imgFile, MultipartFile audioFile, Optional<Long> id) {
		try {
			// Store img and audio files to static folder
			String imgUuid = storageService.store(imgFile);
			String audioUuid = storageService.store(audioFile);

			// Check if music already exists
			if (id != null) mDto.setId(id.get());

	// ---- [Start] Calculate audio duration ---- //
			SimpleDateFormat timeInFormat = new SimpleDateFormat("ss", Locale.FRANCE);
			SimpleDateFormat timeOutFormat = new SimpleDateFormat("mm:ss", Locale.FRANCE);
			SimpleDateFormat timeOutOverAnHourFormat = new SimpleDateFormat("kk:mm:ss", Locale.FRANCE);
			String duration;

			// Convert 'Multipart file' to 'File'
			File file = new File(System.getProperty("java.io.tmpdir")+ "/" + audioFile.getOriginalFilename());
			audioFile.transferTo(file);

			AudioFile af = AudioFileIO.read(file);
			AudioHeader ah = af.getAudioHeader();
			int trackLength = ah.getTrackLength();

			Date timeIn;
			synchronized(timeInFormat) {
				timeIn = timeInFormat.parse(String.valueOf(trackLength));
				System.out.println("timeIn : " + timeIn);
			}
			if(trackLength < 3600L) {
				synchronized(timeOutFormat) {
					System.out.println("timeOutFormat : " + timeOutFormat);
					duration =  timeOutFormat.format(timeIn);
				}
			} else {
				synchronized(timeOutOverAnHourFormat) {
					System.out.println("timeOutOverAnHourFormat : " + timeOutOverAnHourFormat);
					duration = timeOutOverAnHourFormat.format(timeIn);
				}
			}

			//System.out.println("Duration in Integer : " + trackLength);
			System.out.println("Duration in String : " + duration);

			// Delete temp file from Temp folder
			file.deleteOnExit();
	// ---- [End] Calculate audio duration ---- //

			// Set MusicDTO object
			mDto.setDuration(duration);
			mDto.setImgUri(imgUuid);
			mDto.setAudioUri(audioFile.getOriginalFilename());
		} catch (IllegalArgumentException e) {
			System.out.println(e.getMessage());
		} catch (IOException e) {
			System.out.println(e.getMessage());
		} catch (CannotReadException e) {
			throw new RuntimeException(e);
		} catch (TagException e) {
			throw new RuntimeException(e);
		} catch (InvalidAudioFrameException e) {
			throw new RuntimeException(e);
		} catch (ReadOnlyFileException e) {
			throw new RuntimeException(e);
		} catch (ParseException e) {
			throw new RuntimeException(e);
		}
		return mapper.map(repository.save(mapper.map(mDto, Music.class)), MusicDTO.class);
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

package com.dreamteam.app.services;

import java.io.IOException;
import java.text.ParseException;
import java.util.*;
import java.util.stream.Stream;

import com.dreamteam.app.dto.MusicDTO;
import com.dreamteam.app.entities.Music;
import com.dreamteam.app.enums.Tag;
import com.dreamteam.app.exceptions.MusicException;
import com.dreamteam.app.storage.StorageService;
import com.dreamteam.app.utils.CustomUtils;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.http.fileupload.impl.InvalidContentTypeException;
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
public class MusicServiceImpl implements IMusicService {
	private final MusicRepository repository;
	private final ModelMapper mapper;
	private final StorageService storageService;

	public List<MusicDTO> findAll(){
		return repository.findAll().stream().map(music -> mapper.map(music, MusicDTO.class)).toList();
	}
	public  List<MusicDTO> searchMusic(String searchKey){
		return repository.findByTitleContainingIgnoreCaseOrArtistContainingIgnoreCase(searchKey, searchKey).stream().map(music -> mapper.map(music, MusicDTO.class)).toList();
	}
	public  List<MusicDTO> searchMusicByTitle(String searchKey){
		return repository.findByTitleContainingIgnoreCase(searchKey).stream().map(music -> mapper.map(music, MusicDTO.class)).toList();
	}
	public  List<MusicDTO> searchMusicByArtist(String searchKey){
		return repository.findByArtistContainingIgnoreCase(searchKey).stream().map(music -> mapper.map(music, MusicDTO.class)).toList();
	}
	public MusicDTO add(
			MusicDTO mDto,
			MultipartFile imgFile,
			MultipartFile audioFile
		) throws IOException, CannotReadException, TagException, InvalidAudioFrameException, ReadOnlyFileException, ParseException {

		if (Stream.of(mDto.getReleasedAt()).anyMatch(Objects::isNull) || mDto.getTitle().isEmpty() || mDto.getArtist().isEmpty() || mDto.getTags().isEmpty()) {
			System.out.println("A required field is empty or null");
			throw new IllegalArgumentException("Empty field");
		}

		if (!CustomUtils.isImageType(imgFile.getOriginalFilename()) || !CustomUtils.isAudioType(audioFile.getOriginalFilename())) {
			System.out.println("wrong format");
			throw new InvalidContentTypeException("Wrong format");
		}

		String duration = CustomUtils.getDuration(audioFile);
		String imgUri = storageService.store(imgFile);
		String audioUri = storageService.store(audioFile);

		mDto.setDuration(duration);
		mDto.setImgUri(imgUri);
		mDto.setAudioUri(audioUri);
		return mapper.map(repository.save(mapper.map(mDto, Music.class)), MusicDTO.class);
	}

	public MusicDTO update(
			MusicDTO mDto,
			MultipartFile imgFile,
			MultipartFile audioFile,
			long id
		) throws IOException, CannotReadException, TagException, InvalidAudioFrameException, ReadOnlyFileException, ParseException, MusicException {

		if (Stream.of(mDto.getReleasedAt()).anyMatch(Objects::isNull) || mDto.getTitle().isEmpty() || mDto.getArtist().isEmpty() || mDto.getTags().isEmpty()) {
			throw new MusicException("A required field is empty or null");
		}

//		if (!CustomUtils.isImageType(imgFile.getOriginalFilename()) || !CustomUtils.isAudioType(audioFile.getOriginalFilename())) {
//			System.out.println("wrong format");
//			throw new InvalidContentTypeException("Wrong format");
//		}

		if (repository.findById(id).orElse(null) != null) {
			Music m = repository.findById(id).orElse(null);

			// Check if a new image file is uploaded
			if (imgFile == null) mDto.setImgUri(m.getImgUri()); // Get current imgUri in DB
			else if (!CustomUtils.isImageType(imgFile.getOriginalFilename())) { // File type is not an image
				throw new InvalidContentTypeException("Wrong format");
			} else { // Store new imgUri in storage and DB
				String imgUri = storageService.store(imgFile);
				storageService.deleteFile(m.getImgUri(), "img"); // Delete previous img file
				mDto.setImgUri(imgUri);
			}

			// Check if a new audio file is uploaded
			if (audioFile == null) mDto.setAudioUri(m.getAudioUri());
			else {
				String audioUri = storageService.store(audioFile);
				String duration = CustomUtils.getDuration(audioFile);
				storageService.deleteFile(m.getAudioUri(), "audio"); // Delete previous audio file
				mDto.setDuration(duration);
				mDto.setAudioUri(audioUri);
			}

			mDto.setId(id);
			mDto.setDuration(m.getDuration());
			mDto.setVersion(m.getVersion());

			return mapper.map(repository.save(mapper.map(mDto, Music.class)), MusicDTO.class);
		}
		// throw new IOException("File not found");
		return null;
	}
	public void delete(long id) throws IOException {
		Music m = repository.findById(id).orElse(null);
		repository.deleteById(id);
		storageService.deleteFile(m.getImgUri(), "img");
		storageService.deleteFile(m.getAudioUri(), "audio") ;
	}
	public MusicDTO getById(long id) {
		return repository.findById(id).map(music -> mapper.map(music, MusicDTO.class)).orElse(null);
	}

	public List<MusicDTO> getTop10ByTags(Tag tag) {
		return findAll().stream().filter(music -> music.getTags().contains(tag)).limit(10).toList();
	}
	public List<MusicDTO> getTop10ByArtist(String artist) {
		return repository.findTop10ByArtist(artist).stream().map(music -> mapper.map(music, MusicDTO.class)).toList();
	}
}

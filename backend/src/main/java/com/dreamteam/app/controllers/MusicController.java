package com.dreamteam.app.controllers;

import java.io.IOException;
import java.text.ParseException;
import java.util.List;
import java.util.Optional;

import com.dreamteam.app.dto.MusicDTO;
import com.dreamteam.app.enums.Tag;
import lombok.RequiredArgsConstructor;
import org.jaudiotagger.audio.exceptions.CannotReadException;
import org.jaudiotagger.audio.exceptions.InvalidAudioFrameException;
import org.jaudiotagger.audio.exceptions.ReadOnlyFileException;
import org.jaudiotagger.tag.TagException;
import org.springframework.web.bind.annotation.*;

import com.dreamteam.app.services.MusicService;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/music")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class MusicController {
	private final MusicService service;

	@GetMapping
	public List<MusicDTO> findAll(){
		return service.findAll();
	}
	@DeleteMapping("/delete/{id}")
	public void delete(@PathVariable long id){
		try {
			service.delete(id);
		} catch (IOException e) {
			System.out.println("ERRRRRROR" + e.getMessage());
		}
	}
	@GetMapping("/{id}")
	public MusicDTO getById(@PathVariable long id){
		return service.getById(id);
	}
	@PostMapping("/new")
	public MusicDTO add(
		@RequestPart("fileUpload") MusicDTO musicDTO,
		@RequestPart("imgFile") MultipartFile imgFile,
		@RequestPart("audioFile") MultipartFile audioFile
	) {
		try {
			return service.add(musicDTO, imgFile, audioFile);
		} catch (CannotReadException e) {
			throw new RuntimeException(e);
		} catch (TagException e) {
			throw new RuntimeException(e);
		} catch (InvalidAudioFrameException e) {
			throw new RuntimeException(e);
		} catch (ReadOnlyFileException e) {
			throw new RuntimeException(e);
		} catch (IOException e) {
			throw new RuntimeException(e);
		} catch (ParseException e) {
			throw new RuntimeException(e);
		}
	}
	@PostMapping("/update/{id}")
	public MusicDTO update(
		@PathVariable long id,
		@RequestPart("fileUpload") MusicDTO musicDTO,
		@RequestPart(value = "imgFile", required = false) MultipartFile imgFile,
		@RequestPart(value = "audioFile", required = false) MultipartFile audioFile
	) {
		try {
			return service.update(musicDTO, imgFile, audioFile, id);
		} catch (CannotReadException e) {
			throw new RuntimeException(e);
		} catch (TagException e) {
			throw new RuntimeException(e);
		} catch (InvalidAudioFrameException e) {
			throw new RuntimeException(e);
		} catch (ReadOnlyFileException e) {
			throw new RuntimeException(e);
		} catch (IOException e) {
			throw new RuntimeException(e);
		} catch (ParseException e) {
			throw new RuntimeException(e);
		}
	}

	@GetMapping("/byTag/{tag}")
	public List<MusicDTO> getTop10ByTags(@PathVariable Tag tag) {
		return service.getTop10ByTags(tag);
	}
	@GetMapping("/byArtist/{artist}")
	public List<MusicDTO> getTop10ByArtist(@PathVariable String artist) {
		return service.getTop10ByArtist(artist);
	}
}

package com.dreamteam.app.controllers;

import java.io.IOException;
import java.text.ParseException;
import java.util.List;

import com.dreamteam.app.dto.MusicDTO;
import com.dreamteam.app.enums.Tag;
import lombok.RequiredArgsConstructor;
import org.jaudiotagger.audio.exceptions.CannotReadException;
import org.jaudiotagger.audio.exceptions.InvalidAudioFrameException;
import org.jaudiotagger.audio.exceptions.ReadOnlyFileException;
import org.jaudiotagger.tag.TagException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.dreamteam.app.services.MusicService;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/music")
@RequiredArgsConstructor
public class MusicController {
	private final MusicService service;

	@GetMapping
	public ResponseEntity<List<MusicDTO>> findAll(){
		return ResponseEntity.ok(service.findAll());
	}
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Void> delete(@PathVariable long id) throws IOException {
		service.delete(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	@GetMapping("/{id}")
	public ResponseEntity<MusicDTO> getById(@PathVariable long id){
		return ResponseEntity.ok(service.getById(id));
	}
	@GetMapping("/search/{searchKey}")
	public ResponseEntity<List<MusicDTO>> searchMusic(@PathVariable String searchKey){
		return ResponseEntity.ok(service.searchMusic(searchKey));
	}
	@GetMapping("/search/title/{searchKey}")
	public ResponseEntity<List<MusicDTO>> searchMusicByTitle(@PathVariable String searchKey){
		return ResponseEntity.ok(service.searchMusicByTitle(searchKey));
	}
	@GetMapping("/search/artist/{searchKey}")
	public ResponseEntity<List<MusicDTO>> searchMusicByArtist(@PathVariable String searchKey){
		return ResponseEntity.ok(service.searchMusicByArtist(searchKey));
	}
	@PostMapping("/new")
	public ResponseEntity<MusicDTO> add(
		@RequestPart("fileUpload") MusicDTO musicDTO,
		@RequestPart("imgFile") MultipartFile imgFile,
		@RequestPart("audioFile") MultipartFile audioFile
	) {
		try {
			return ResponseEntity.ok(service.add(musicDTO, imgFile, audioFile));
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
	public ResponseEntity<MusicDTO> update(
		@PathVariable long id,
		@RequestPart("fileUpload") MusicDTO musicDTO,
		@RequestPart(value = "imgFile", required = false) MultipartFile imgFile,
		@RequestPart(value = "audioFile", required = false) MultipartFile audioFile
	) {
		try {
			return ResponseEntity.ok(service.update(musicDTO, imgFile, audioFile, id));
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
	public ResponseEntity<List<MusicDTO>> getTop10ByTags(@PathVariable Tag tag) {
		return ResponseEntity.ok(service.getTop10ByTags(tag));
	}
	@GetMapping("/byArtist/{artist}")
	public ResponseEntity<List<MusicDTO>> getTop10ByArtist(@PathVariable String artist) {
		return ResponseEntity.ok(service.getTop10ByArtist(artist));
	}
}

package com.dreamteam.app.controllers;

import java.io.IOException;
import java.text.ParseException;
import java.util.List;

import com.dreamteam.app.dto.MusicDTO;
import com.dreamteam.app.enums.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.RequiredArgsConstructor;
import org.jaudiotagger.audio.exceptions.CannotReadException;
import org.jaudiotagger.audio.exceptions.InvalidAudioFrameException;
import org.jaudiotagger.audio.exceptions.ReadOnlyFileException;
import org.jaudiotagger.tag.TagException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.dreamteam.app.services.MusicServiceImpl;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/music")
@RequiredArgsConstructor
public class MusicController {
	private final MusicServiceImpl service;

	@GetMapping
	public ResponseEntity<List<MusicDTO>> findAll(){
		return ResponseEntity.ok(service.findAll());
	}
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Void> delete(@PathVariable @Pattern(regexp = "^[0-9]$+") @NotBlank long id) throws IOException {
		service.delete(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	@GetMapping("/{id}")
	public ResponseEntity<MusicDTO> getById(@PathVariable @Pattern(regexp = "^[0-9]$+") @NotBlank long id){
		MusicDTO musicDTO = service.getById(id);

		if (musicDTO == null) return ResponseEntity.notFound().build();
		return ResponseEntity.ok(service.getById(id));
	}
	@GetMapping("/search/{searchKey}")
	public ResponseEntity<List<MusicDTO>> searchMusic(@PathVariable @Pattern(regexp = "^[a-zA-Z0-9 ]+$") String searchKey){
		return ResponseEntity.ok(service.searchMusic(searchKey));
	}
	@GetMapping("/search/title/{searchKey}")
	public ResponseEntity<List<MusicDTO>> searchMusicByTitle(@PathVariable @Pattern(regexp = "^[a-zA-Z0-9 ]+$") String searchKey){
		return ResponseEntity.ok(service.searchMusicByTitle(searchKey));
	}
	@GetMapping("/search/artist/{searchKey}")
	public ResponseEntity<List<MusicDTO>> searchMusicByArtist(@PathVariable @Pattern(regexp = "^[a-zA-Z0-9 ]+$") String searchKey){
		return ResponseEntity.ok(service.searchMusicByArtist(searchKey));
	}
	@PostMapping("/new")
	public ResponseEntity<MusicDTO> add(
		@RequestPart("fileUpload") @Valid MusicDTO musicDTO,
		@RequestPart("imgFile") MultipartFile imgFile,
		@RequestPart("audioFile") MultipartFile audioFile
	) throws CannotReadException, TagException, InvalidAudioFrameException, ReadOnlyFileException, IOException, ParseException {
		return ResponseEntity.ok(service.add(musicDTO, imgFile, audioFile));
	}
	@PostMapping("/update/{id}")
	public ResponseEntity<MusicDTO> update(
		@PathVariable @Pattern(regexp = "^[0-9]+$") @NotBlank long id,
		@RequestPart("fileUpload") @Valid MusicDTO musicDTO,
		@RequestPart(value = "imgFile", required = false) MultipartFile imgFile,
		@RequestPart(value = "audioFile", required = false) MultipartFile audioFile
	) throws CannotReadException, TagException, InvalidAudioFrameException, ReadOnlyFileException, IOException, ParseException {
		return ResponseEntity.ok(service.update(musicDTO, imgFile, audioFile, id));
	}

	@GetMapping("/byTag/{tag}")
	public ResponseEntity<List<MusicDTO>> getTop10ByTags(@PathVariable @Pattern(regexp = "^[A-Z]+$") Tag tag) {
		return ResponseEntity.ok(service.getTop10ByTags(tag));
	}
	@GetMapping("/byArtist/{artist}")
	public ResponseEntity<List<MusicDTO>> getTop10ByArtist(@PathVariable @Pattern(regexp = "^[a-zA-Z0-9 ]+$") String artist) {
		return ResponseEntity.ok(service.getTop10ByArtist(artist));
	}
	@GetMapping("/four-random")
	public ResponseEntity<List<MusicDTO>>countAllMusic(){
		return ResponseEntity.ok(service.findRandomMusic());
	}
}

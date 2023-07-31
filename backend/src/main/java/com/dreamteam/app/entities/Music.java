package com.dreamteam.app.entities;

import java.time.LocalDate;
import java.util.Set;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Music {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	private String name;
	private String artist;
	private String duration;
	private LocalDate releasedAt;
	private String imgUri;
	private String audioUri;

	@Enumerated(EnumType.STRING)
	private Set<Tags> tags;

	@ManyToMany(mappedBy = "musics")
	private Set<Playlist> playlists;

	public Music(long id, String name, String artist, String duration, LocalDate releasedAt, String imgUri, String audioUri, Set<Tags> tags) {
		this.id = id;
		this.name = name;
		this.artist = artist;
		this.duration = duration;
		this.releasedAt = releasedAt;
		this.imgUri = imgUri;
		this.audioUri = audioUri;
		this.tags = tags;
	}
	public Music(String name, String artist, String duration, LocalDate releasedAt, String imgUri, String audioUri, Set<Tags> tags) {
		this.name = name;
		this.artist = artist;
		this.duration = duration;
		this.releasedAt = releasedAt;
		this.imgUri = imgUri;
		this.audioUri = audioUri;
		this.tags = tags;
	}

	public Music() {}

}

package com.dreamteam.app.entities;

import java.time.LocalDate;
import java.util.List;
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

	private String title;
	private String artist;
	private String duration;

	@Temporal(TemporalType.DATE)
	private LocalDate releasedAt;

	private String imgUri;
	private String audioUri;

	@Enumerated(EnumType.STRING)
	private List<Tags> tags;

	//@ManyToMany(mappedBy = "musics")
	//private Set<Playlist> playlists;

	public Music(String title, String artist, String duration, LocalDate releasedAt, String imgUri, String audioUri, List<Tags> tags) {
		this.title = title;
		this.artist = artist;
		this.duration = duration;
		this.releasedAt = releasedAt;
		this.imgUri = imgUri;
		this.audioUri = audioUri;
		this.tags = tags;
	}
	public Music(long id, String title, String artist, String duration, LocalDate releasedAt, String imgUri, String audioUri, List<Tags> tags) {
		this.id = id;
		this.title = title;
		this.artist = artist;
		this.duration = duration;
		this.releasedAt = releasedAt;
		this.imgUri = imgUri;
		this.audioUri = audioUri;
		this.tags = tags;
	}

	public Music() {}


}

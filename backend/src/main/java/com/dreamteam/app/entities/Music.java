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

	@Enumerated(EnumType.STRING)
	private Set<Tags> tags;
	
	public Music(long id, String name, String artist, String duration, LocalDate releasedAt, Set<Tags> tags) {
		this.id = id;
		this.name = name;
		this.artist = artist;
		this.duration = duration;
		this.releasedAt = releasedAt;
		this.tags = tags;
	}
	public Music() {}

}

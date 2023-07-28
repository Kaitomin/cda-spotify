package com.dreamteam.app.entities;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
	private String artiste;
	private String duration;
	private LocalDate releasedAt;
	private List<Tags> tags;
	
	
	public Music(long id, String name, String artiste, String duration, LocalDate releasedAt, List<Tags> tags) {
		this.id = id;
		this.name = name;
		this.artiste = artiste;
		this.duration = duration;
		this.releasedAt = releasedAt;
		this.tags = tags;
	}
	public Music() {

	}
	
	
}

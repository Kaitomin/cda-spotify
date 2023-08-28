package com.dreamteam.app.dto;


import com.dreamteam.app.enums.Tag;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class MusicDTO {
	private long id;

	@Pattern(regexp = "^[a-zA-Z0-9 ]+$")
	@Size(min = 2, message = "Title must have at least 2 characters")
	private String title;

	@Pattern(regexp = "^[a-zA-Z0-9 ]+$")
	@Size(min = 2, message = "Artist must have at least 2 characters")
	private String artist;

	private String duration;

	@NotNull
	private LocalDate releasedAt;

	private String imgUri;

	private String audioUri;

	@NotEmpty
	private List<Tag> tags;

	private Integer Version;

	public void setTitle(String title) {
		this.title = title.trim();
	}

	public void setArtist(String artist) {
		this.artist = artist.trim();
	}
}

package com.dreamteam.app.dto;


import com.dreamteam.app.enums.Tag;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class MusicDTO {
	private long id;
	private String title;
	private String artist;
	private String duration;
	private LocalDate releasedAt;
	private String imgUri;
	private String audioUri;
	private List<Tag> tags;
}

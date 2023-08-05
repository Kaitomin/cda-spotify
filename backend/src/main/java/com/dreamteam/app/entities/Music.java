package com.dreamteam.app.entities;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

import jakarta.persistence.*;
import lombok.*;

import javax.management.ConstructorParameters;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Music {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@NonNull
	private String title;
	@NonNull
	private String artist;
	@NonNull
	private String duration;
	@Temporal(TemporalType.DATE)
	@NonNull
	private LocalDate releasedAt;
	@NonNull
	private String imgUri;
	@NonNull
	private String audioUri;
	@Enumerated(EnumType.STRING)
	@NonNull
	private List<Tags> tags;
}

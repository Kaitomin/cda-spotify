package com.dreamteam.app.entities;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

import com.dreamteam.app.enums.Tag;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Music implements Serializable {
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
	private List<Tag> tags;
	@Version
	private Integer version;
}

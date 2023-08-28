package com.dreamteam.app.entities;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

import com.dreamteam.app.enums.Tag;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
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
	@Pattern(regexp = "^[a-zA-Z0-9 ]+$")
	@Size(min = 2, message = "Title must have at least 2 characters")
	private String title;

	@NonNull
	@Pattern(regexp = "^[a-zA-Z0-9 ]+$")
	@Size(min = 2, message = "Artist must have at least 2 characters")
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
	@NotEmpty
	private List<Tag> tags;

	@Version
	private Integer version;
}

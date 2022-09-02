package be.thomasmore.bookserver.model;


import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@NoArgsConstructor
@Data
@Entity
public class Genre {
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "genre_generator")
    @SequenceGenerator(name = "genre_generator", sequenceName = "genre_seq", allocationSize = 1)
    @Id
    int id;
    @NotBlank(message="Genre name should not be blank") @NotNull
    String name;
}

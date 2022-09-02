package be.thomasmore.bookserver.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@EqualsAndHashCode(exclude = {"authors"})
@ToString(exclude = {"authors"})
@Entity
public class Book {
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "book_generator")
    @SequenceGenerator(name = "book_generator", sequenceName = "book_seq", allocationSize = 1)
    @Id
    private int id;

    @NotBlank(message = "Book Title should not be blank")
    @NotNull
    private String title;

    @Min(value = 0, message = "price should not be smaller than 0")
    @Max(value = 200, message = "price should not be greater than 200")
    Integer priceInEur;

    //todo: clean up (with flyway)
    private String author = ""; //this is not normalized but I don't care for this example

    @ManyToMany(fetch = FetchType.LAZY)
    private List<Author> authors;
}


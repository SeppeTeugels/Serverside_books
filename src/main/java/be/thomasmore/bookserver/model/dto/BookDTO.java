package be.thomasmore.bookserver.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;

@NoArgsConstructor
@Data
public class BookDTO {
    private int id;
    private String title;
    private Collection<AuthorDTO> authors;
}


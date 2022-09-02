package be.thomasmore.bookserver.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class BookDetailedDTO {
    private int id;
    private String title;

    //more data will be inserted here later...

    private Collection<AuthorDTO> authors;
}


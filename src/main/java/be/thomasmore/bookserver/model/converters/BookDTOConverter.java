package be.thomasmore.bookserver.model.converters;

import be.thomasmore.bookserver.model.Book;
import be.thomasmore.bookserver.model.dto.BookDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BookDTOConverter {

    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private AuthorDTOConverter authorDTOConverter;

    /**
     * @param book the entity from the db
     * @return BookDTO object to send to the client.
     * The BookDTO contains an array of  BookDTO.AuthorDto
     * so that the client does not need to do a second request to display this basic info.
     */
    public BookDTO convertToDto(Book book) {
        return modelMapper.map(book, BookDTO.class);
    }
}

package be.thomasmore.bookserver.model.converters;

import be.thomasmore.bookserver.model.Author;
import be.thomasmore.bookserver.model.Book;
import be.thomasmore.bookserver.model.dto.BookDetailedDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.stream.Collectors;

@Component
public class BookDetailedDTOConverter {

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
    public BookDetailedDTO convertToDto(Book book) {
        return modelMapper.map(book, BookDetailedDTO.class);
    }

    /**
     * @param bookDto the data from client that has to be converted
     * @param book:   the original book entity (from db) - this object will be overwritten with the data from bookDto
     * @return the modified book entity object - ready to save in the database
     * Do not overwrite the authors-array.
     * Use the PUT request api/books/{id}/authors to update the authors for a book.
     */
    public Book convertToEntity(BookDetailedDTO bookDto, Book book) {
        modelMapper.map(bookDto, book);
        return book;
    }

    /**
     * @param bookDto - can contain an array of BookDTO.authorDto objects.
     *                Each BookDTO.authorDto has to contain the id of an existing author.
     * @return the book entity object - ready to save in the database
     */
    public Book convertToEntity(BookDetailedDTO bookDto) {
        final Book book = modelMapper.map(bookDto, Book.class);

        //updates book-author relation, not the author objects!
        if (book.getAuthors() != null) {
            book.setAuthors(book.getAuthors().stream()
                    .map(a -> new Author(a.getId()))
                    .collect(Collectors.toCollection(ArrayList::new)));
        }
        return book;
    }
}

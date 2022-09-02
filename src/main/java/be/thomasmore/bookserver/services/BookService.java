package be.thomasmore.bookserver.services;

import be.thomasmore.bookserver.model.Author;
import be.thomasmore.bookserver.model.Book;
import be.thomasmore.bookserver.model.converters.AuthorDTOConverter;
import be.thomasmore.bookserver.model.converters.BookDTOConverter;
import be.thomasmore.bookserver.model.converters.BookDetailedDTOConverter;
import be.thomasmore.bookserver.model.dto.AuthorDTO;
import be.thomasmore.bookserver.model.dto.BookDTO;
import be.thomasmore.bookserver.model.dto.BookDetailedDTO;
import be.thomasmore.bookserver.repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BookDTOConverter bookDTOConverter;
    @Autowired
    private BookDetailedDTOConverter bookDetailedDTOConverter;
    @Autowired
    private AuthorDTOConverter authorDTOConverter;

    public List<BookDTO> findAll(String titleKeyWord) {
        final List<Book> books = titleKeyWord == null ?
                bookRepository.findAll() :
                bookRepository.findByTitleContainingIgnoreCase(titleKeyWord);

        return books.stream()
                .map(b -> bookDTOConverter.convertToDto(b))
                .collect(Collectors.toList());
    }

    public BookDetailedDTO findOne(int id) {
        final Optional<Book> book = bookRepository.findById(id);
        if (book.isEmpty())
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    String.format("Book with id %d does not exist.", id));

        return bookDetailedDTOConverter.convertToDto(book.get());
    }

    public List<AuthorDTO> authorsForBook(int bookId) {
        Optional<Book> bookFromDb = bookRepository.findById(bookId);
        if (bookFromDb.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    String.format("Book with id %d not found.", bookId));

        return bookFromDb.get().getAuthors().stream()
                .map(a -> authorDTOConverter.convertToDto(a))
                .collect(Collectors.toList());
    }

    public BookDetailedDTO create(BookDetailedDTO bookDto) {
        if (bookRepository.findByTitle(bookDto.getTitle()).isPresent())
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    String.format("Book with title %s already exists.", bookDto.getTitle()));

        bookDto.setAuthors(null); //we do not want to update the relation
        final Book entityToSave = bookDetailedDTOConverter.convertToEntity(bookDto);
        final Book bookSaved = bookRepository.save(entityToSave);
        return bookDetailedDTOConverter.convertToDto(bookSaved);
    }

    public BookDetailedDTO edit(int id, BookDetailedDTO bookDto) {
        if (bookDto.getId() != id)
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    String.format("id in book (%d) does not match id in url (%d).", bookDto.getId(), id));

        Optional<Book> bookFromDb = bookRepository.findById(id);
        if (bookFromDb.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    String.format("Book with id %d not found.", id));

        //overwrite fields present in bookDto - relations are not touched
        Book bookSaved = bookRepository.save(bookDetailedDTOConverter.convertToEntity(bookDto, bookFromDb.get()));
        return bookDetailedDTOConverter.convertToDto(bookSaved);
    }

    public BookDetailedDTO editAuthorsForBook(int id, List<Integer> authorIds) {
        Optional<Book> bookFromDb = bookRepository.findById(id);
        if (bookFromDb.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    String.format("Book with id %d not found.", id));

        Book book = bookFromDb.get();
        List<Author> authorIdObjects = (authorIds != null)
                ? authorIds.stream().map(Author::new).collect(Collectors.toList())
                : new ArrayList<>();
        book.setAuthors(authorIdObjects);
        Book bookSaved = bookRepository.save(book);
        return bookDetailedDTOConverter.convertToDto(bookSaved);
    }

    public void delete(int id) {
        Optional<Book> bookFromDb = bookRepository.findById(id);
        if (bookFromDb.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    String.format("Book with id %d not found.", id));

        bookRepository.deleteById(id);
    }
}

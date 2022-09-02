package be.thomasmore.bookserver.controllers;

import be.thomasmore.bookserver.AbstractIntegrationTest;
import be.thomasmore.bookserver.model.Book;
import be.thomasmore.bookserver.model.dto.AuthorDTO;
import be.thomasmore.bookserver.model.dto.BookDetailedDTO;
import be.thomasmore.bookserver.repositories.BookRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.jdbc.Sql;

import javax.transaction.Transactional;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.AFTER_TEST_METHOD;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


/**
 * Intention is that relation is never updated when the Book is created in the db.
 * See Swagger-info: to update the relation you have to PUT api/books/{id}/authors
 * Even if the client (frontend) passes an author-array, the relation is NOT updated.
 */

@SuppressWarnings("SpringTestingSqlInspection")
@Sql(scripts = {"/sql/books/create_2_books.sql", "/sql/authors/create_2_authors.sql"})
@Sql(scripts = {"/sql/books/clean_books.sql", "/sql/authors/clean_authors.sql"}, executionPhase = AFTER_TEST_METHOD)
public class BookControllerCreateWithAuthorsTest extends AbstractIntegrationTest {

    @Autowired
    private BookRepository bookRepository;

    @Test
    @WithMockUser
    @Transactional
    public void createBookWithAuthorIdShouldNotSetTheRelation() throws Exception {
        final String BOOK_TITLE = "Create a book with an author id";
        AuthorDTO authorDto = AuthorDTO.builder().id(1).build(); // author 1 exists
        BookDetailedDTO newBookDto = BookDetailedDTO.builder()
                .title(BOOK_TITLE)
                .authors(List.of(authorDto))
                .build();

        mockMvc.perform(getMockRequestPostBooks(newBookDto))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.authors").isEmpty());

        //book is created in db:
        Book loadedBook = bookRepository.findByTitle(BOOK_TITLE).orElseThrow();
        assertThat(loadedBook.getTitle()).isEqualTo(BOOK_TITLE);

        //book does not have authors in db:
        assertThat(loadedBook.getAuthors()).isNull();
    }

    @Test
    @WithMockUser
    @Transactional
    public void createBookWithFilledAuthorDTOShouldNotSetTheRelation() throws Exception {
        final String BOOK_TITLE = "Create a book with a filled author object";
        final String AUTHOR_NAME = "Adrian Vandenhoof";
        AuthorDTO authorDTO = AuthorDTO.builder().id(1).name(AUTHOR_NAME).build();
        BookDetailedDTO newBookDto = BookDetailedDTO.builder()
                .title(BOOK_TITLE)
                .authors(List.of(authorDTO))
                .build();

        mockMvc.perform(getMockRequestPostBooks(newBookDto))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.authors").isEmpty());

        //book is created in db:
        Book loadedBook = bookRepository.findByTitle(BOOK_TITLE).orElseThrow();
        assertThat(loadedBook.getTitle()).isEqualTo(BOOK_TITLE);

        //book does not have authors in db:
        assertThat(loadedBook.getAuthors()).isNull();
    }

}
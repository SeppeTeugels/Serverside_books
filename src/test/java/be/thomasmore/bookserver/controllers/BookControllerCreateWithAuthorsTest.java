package be.thomasmore.bookserver.controllers;

import be.thomasmore.bookserver.AbstractIntegrationTest;
import be.thomasmore.bookserver.model.Book;
import be.thomasmore.bookserver.model.dto.AuthorDTO;
import be.thomasmore.bookserver.model.dto.BookDetailedDTO;
import be.thomasmore.bookserver.repositories.BookRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

import javax.transaction.Transactional;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


/**
 * Intention is that relation is never updated when the Book is created in the db.
 * See Swagger-info: to update the relation you have to PUT api/books/{id}/authors
 * Even if the client (frontend) passes an author-array, the relation is NOT updated.
 */

public class BookControllerCreateWithAuthorsTest extends AbstractIntegrationTest {

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private BookRepository bookRepository;

    @Test
    @WithMockUser
    @Transactional
    public void createBookWithAuthorIdShouldNotSetTheRelation() throws Exception {
        final String BOOK_TITLE = "createBookWithAuthor";
        final int AUTHOR_ID = 1;
        AuthorDTO authorDTO = AuthorDTO.builder().id(AUTHOR_ID).build(); //assumption author 1 exists (othersw
        BookDetailedDTO newBookDto = BookDetailedDTO.builder()
                .title(BOOK_TITLE)
                .authors(List.of(authorDTO))
                .build();
        MockHttpServletRequestBuilder mockRequest = getMockRequestPostBooks(newBookDto);

        mockMvc.perform(mockRequest)
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
        final String BOOK_TITLE = "createBookWithFilledAuthorDTO";
        final int AUTHOR_ID = 1;
        final String AUTHOR_NAME = "Adrian Van Hoof";
        AuthorDTO authorDTO = AuthorDTO.builder().id(AUTHOR_ID).name(AUTHOR_NAME).build();
        BookDetailedDTO newBookDto = BookDetailedDTO.builder()
                .title(BOOK_TITLE)
                .authors(List.of(authorDTO))
                .build();
        MockHttpServletRequestBuilder mockRequest = getMockRequestPostBooks(newBookDto);

        mockMvc.perform(mockRequest)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.authors").isEmpty());

        //book is created in db:
        Book loadedBook = bookRepository.findByTitle(BOOK_TITLE).orElseThrow();
        assertThat(loadedBook.getTitle()).isEqualTo(BOOK_TITLE);

        //book does not have authors in db:
        assertThat(loadedBook.getAuthors()).isNull();
    }

}
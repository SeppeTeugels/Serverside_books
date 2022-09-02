package be.thomasmore.bookserver.controllers;

import be.thomasmore.bookserver.AbstractIntegrationTest;
import be.thomasmore.bookserver.model.dto.BookDetailedDTO;
import be.thomasmore.bookserver.repositories.BookRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.AFTER_TEST_METHOD;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SuppressWarnings("SpringTestingSqlInspection")
@Sql(scripts = "/sql/books/clean_books.sql", executionPhase = AFTER_TEST_METHOD)
public class BookControllerCreateSecurityTest extends AbstractIntegrationTest {

    @Autowired
    private BookRepository bookRepository;

    @Test
    public void createBook_notPossibleIfNotAuthenticated() throws Exception {
        final String BOOK_TITLE = "Create a Book when you are not authenticated";
        BookDetailedDTO newBookDto = BookDetailedDTO.builder()
                .title(BOOK_TITLE)
                .build();

        mockMvc.perform(getMockRequestPostBooks(newBookDto))
                .andExpect(status().isUnauthorized());

        assertThat(bookRepository.count()).isEqualTo(0);
    }

    @Test
    @WithMockUser
    public void createBook_notPossibleIfNoCsrfToken() throws Exception {
        final String BOOK_TITLE = "Create a Book without csrf token";
        BookDetailedDTO newBookDto = BookDetailedDTO.builder()
                .title(BOOK_TITLE)
                .build();

        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders
                .post("/api/books/")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(this.mapper.writeValueAsString(newBookDto));

        mockMvc.perform(mockRequest)
                .andExpect(status().isForbidden());

        assertThat(bookRepository.count()).isEqualTo(0);
    }

}
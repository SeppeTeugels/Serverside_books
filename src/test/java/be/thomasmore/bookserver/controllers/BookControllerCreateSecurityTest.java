package be.thomasmore.bookserver.controllers;

import be.thomasmore.bookserver.AbstractIntegrationTest;
import be.thomasmore.bookserver.model.dto.BookDetailedDTO;
import be.thomasmore.bookserver.repositories.BookRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


public class BookControllerCreateSecurityTest extends AbstractIntegrationTest {

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private BookRepository bookRepository;

    @Test
    public void createBook_notPossibleIfNotAuthenticated() throws Exception {
        final String BOOK_TITLE = "Book not authenticated";
        BookDetailedDTO NEW_BOOK_DTO = BookDetailedDTO.builder()
                .title(BOOK_TITLE)
                .build();
        MockHttpServletRequestBuilder mockRequest = getMockRequestPostBooks(NEW_BOOK_DTO);

        mockMvc.perform(mockRequest)
                .andExpect(status().isUnauthorized());

        assertThat(bookRepository.findByTitle(BOOK_TITLE).isEmpty()).isTrue();
    }

    @Test
    @WithMockUser
    public void createBook_notPossibleIfNoCsrfToken() throws Exception {
        final String BOOK_TITLE = "Book without csrf token";
        BookDetailedDTO NEW_BOOK_DTO = BookDetailedDTO.builder()
                .title(BOOK_TITLE)
                .build();

        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders
                .post("/api/books/")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(this.mapper.writeValueAsString(NEW_BOOK_DTO));

        mockMvc.perform(mockRequest)
                .andExpect(status().isForbidden());

        assertThat(bookRepository.findByTitle(BOOK_TITLE).isEmpty()).isTrue();
    }

}
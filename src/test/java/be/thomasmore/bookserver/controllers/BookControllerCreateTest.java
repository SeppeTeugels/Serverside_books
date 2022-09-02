package be.thomasmore.bookserver.controllers;

import be.thomasmore.bookserver.AbstractIntegrationTest;
import be.thomasmore.bookserver.model.Book;
import be.thomasmore.bookserver.model.dto.BookDetailedDTO;
import be.thomasmore.bookserver.repositories.BookRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.web.bind.annotation.ExceptionHandler;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


public class BookControllerCreateTest extends AbstractIntegrationTest {

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private BookRepository bookRepository;

    @Test
    @WithMockUser
    public void createBook() throws Exception {
        final String BOOK_TITLE = "createBook simple";
        BookDetailedDTO newBookDto = BookDetailedDTO.builder()
                .title(BOOK_TITLE)
                .build();
        MockHttpServletRequestBuilder mockRequest = getMockRequestPostBooks(newBookDto);

        mockMvc.perform(mockRequest)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").isNumber())
                .andExpect(jsonPath("$.title").value(BOOK_TITLE))
                .andExpect(jsonPath("$.authors").isEmpty());

        Book loadedBook = bookRepository.findByTitle(BOOK_TITLE).orElseThrow();
        assertThat(loadedBook.getTitle()).isEqualTo(BOOK_TITLE);
    }


    @Test
    @ExceptionHandler
    @WithMockUser
    public void createBook_titleCannotBeEmpty() throws Exception {
        final long nrOfBooksBeforeTest = bookRepository.count();
        BookDetailedDTO newBookDto = BookDetailedDTO.builder()
                .title(null)
                .build();
        MockHttpServletRequestBuilder mockRequest = getMockRequestPostBooks(newBookDto);

        assertThatThrownBy(() -> mockMvc.perform(mockRequest));
        assertThat(nrOfBooksBeforeTest).isEqualTo(bookRepository.count());
    }

    @Test
    @ExceptionHandler
    @WithMockUser
    public void createBook_titleCannotBeBlank() throws Exception {
        final long nrOfBooksBeforeTest = bookRepository.count();
        BookDetailedDTO newBookDto = BookDetailedDTO.builder()
                .title("")
                .build();
        MockHttpServletRequestBuilder mockRequest = getMockRequestPostBooks(newBookDto);

        assertThatThrownBy(() -> mockMvc.perform(mockRequest));
        assertThat(nrOfBooksBeforeTest).isEqualTo(bookRepository.count());
    }

    @Test
    @ExceptionHandler
    @WithMockUser
    public void createBook_titleHasToBeUnique() throws Exception {
        BookDetailedDTO newBookDto = BookDetailedDTO.builder()
                .title("existing book")
                .build();
        MockHttpServletRequestBuilder mockRequest = getMockRequestPostBooks(newBookDto);

        //first time is ok
        mockMvc.perform(mockRequest)
                .andExpect(status().isOk());

        //send the same POST again with same title - fails
        final long nrOfBooksBeforeTest = bookRepository.count();
        final MvcResult mvcResult = mockMvc.perform(mockRequest)
                .andExpect(status().isInternalServerError())
                .andReturn();
        assertThat(mvcResult.getResponse().getErrorMessage()).isEqualTo("Book with title existing book already exists.");
        assertThat(nrOfBooksBeforeTest).isEqualTo(bookRepository.count());
    }

    @Test
    @WithMockUser
    public void createBook_givenIdIsNotTakenIntoAccount() throws Exception {
        //value of book auto sequence after executing data.sql is 6 (data.sql)
        int GIVEN_ID = 57;
        final String BOOK_TITLE = "Book with random given id";
        BookDetailedDTO newBookDto = BookDetailedDTO.builder().id(GIVEN_ID)
                .title(BOOK_TITLE)
                .build();
        MockHttpServletRequestBuilder mockRequest = getMockRequestPostBooks(newBookDto);

        mockMvc.perform(mockRequest)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").isNumber())
                .andExpect(jsonPath("$.title").value(BOOK_TITLE))
                .andExpect(jsonPath("$.authors").isEmpty());

        Book loadedBook = bookRepository.findByTitle(BOOK_TITLE).orElseThrow();
        assertThat(loadedBook.getId()).isNotEqualTo(GIVEN_ID);
        assertThat(loadedBook.getTitle()).isEqualTo(BOOK_TITLE);
    }

}
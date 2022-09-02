package be.thomasmore.bookserver.controllers;

import be.thomasmore.bookserver.AbstractIntegrationTest;
import be.thomasmore.bookserver.model.Book;
import be.thomasmore.bookserver.repositories.BookRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class BookControllerGetOneBookTest extends AbstractIntegrationTest {

    Iterable<Book> savedBooks;

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private BookRepository bookRepository;

    @BeforeEach
    public void setUp() {
        bookRepository.deleteAll();

        String BOOK1_TITLE = "Automating and Testing a REST API";
        String BOOK2_TITLE = "REST API Automation Testing from Scratch";
        final Book BOOK_1 = Book.builder().title(BOOK1_TITLE).build();
        final Book BOOK_2 = Book.builder().title(BOOK2_TITLE).build();
        List<Book> books = new ArrayList<>(Arrays.asList(BOOK_1, BOOK_2));
        savedBooks = bookRepository.saveAll(books);
    }

    @Test
    public void getOneBook() throws Exception {
        Book savedBook1 = savedBooks.iterator().next();
        final MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders
                .get("/api/books/" + savedBook1.getId())
                .contentType(MediaType.APPLICATION_JSON);
        mockMvc.perform(mockRequest)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(savedBook1.getId()))
                .andExpect(jsonPath("$.title").value(savedBook1.getTitle()))
                .andExpect(jsonPath("$.authors").exists())
                .andExpect(jsonPath("$.authors").isEmpty());
    }

    @Test
    public void getOneBookNotFound() throws Exception {
        Book savedBook1 = savedBooks.iterator().next();
        final MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders
                .get("/api/books/9999")
                .contentType(MediaType.APPLICATION_JSON);
        final MvcResult mvcResult = mockMvc.perform(mockRequest)
                .andExpect(status().isInternalServerError()) // strange!!! I expected isNotFound().....??????
                .andReturn();
        assertThat(mvcResult.getResponse().getErrorMessage()).isEqualTo("Book with id 9999 does not exist.");

    }

}

package be.thomasmore.bookserver.controllers;

import be.thomasmore.bookserver.AbstractIntegrationTest;
import be.thomasmore.bookserver.model.Book;
import be.thomasmore.bookserver.repositories.BookRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class BookControllerGetAllBooksTest extends AbstractIntegrationTest {
    private final String BOOK1_TITLE = "Automating and Testing a REST API";
    private final String BOOK2_TITLE = "REST API Automation Testing from Scratch";

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private BookRepository bookRepository;

    @BeforeEach
    public void setUp() {
        bookRepository.deleteAll();
        final Book BOOK_1 = Book.builder().title(BOOK1_TITLE).build();
        final Book BOOK_2 = Book.builder().title(BOOK2_TITLE).build();
        List<Book> books = new ArrayList<>(Arrays.asList(BOOK_1, BOOK_2));
        bookRepository.saveAll(books);
    }

    @Test
    public void getAllBooks() throws Exception {
        final MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders
                .get("/api/books")
                .contentType(MediaType.APPLICATION_JSON);
        mockMvc.perform(mockRequest)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id").isNumber())
                .andExpect(jsonPath("$[0].title").value(BOOK1_TITLE))
                .andExpect(jsonPath("$[0].authors").exists())
                .andExpect(jsonPath("$[0].authors").isEmpty())
                .andExpect(jsonPath("$[1].id").isNumber())
                .andExpect(jsonPath("$[1].title").value(BOOK2_TITLE))
                .andExpect(jsonPath("$[1].authors").exists())
                .andExpect(jsonPath("$[1].authors").isEmpty());
    }

    @Test
    public void getAllBooksFilter() throws Exception {
        final MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders
                .get("/api/books?titleKeyWord=from Scratch")
                .contentType(MediaType.APPLICATION_JSON);
        mockMvc.perform(mockRequest)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].title").value(BOOK2_TITLE));
    }

    @Test
    public void getAllBooksFilterCaseInsensitive() throws Exception {
        final MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders
                .get("/api/books?titleKeyWord=FROM scratch")
                .contentType(MediaType.APPLICATION_JSON);
        mockMvc.perform(mockRequest)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].title").value(BOOK2_TITLE));
    }
}

package be.thomasmore.bookserver.controllers;

import be.thomasmore.bookserver.AbstractIntegrationTest;
import org.junit.jupiter.api.Test;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MvcResult;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.AFTER_TEST_METHOD;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SuppressWarnings("SpringTestingSqlInspection")
@Sql("/sql/books/create_2_books.sql")
@Sql(scripts = "/sql/books/clean_books.sql", executionPhase = AFTER_TEST_METHOD)
public class BookControllerGetOneBookTest extends AbstractIntegrationTest {

    @Test
    public void getOneBook() throws Exception {
        mockMvc.perform(getMockRequestGetBooks("/api/books/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.title").value("Test Automation"))
                .andExpect(jsonPath("$.authors").exists())
                .andExpect(jsonPath("$.authors").isEmpty());
    }

    @Test
    public void getOneBookNotFound() throws Exception {
        final MvcResult mvcResult =
                mockMvc.perform(getMockRequestGetBooks("/api/books/9999"))
                        .andExpect(status().isInternalServerError()) // strange!!! I expected isNotFound().....??????
                        .andReturn();
        assertThat(mvcResult.getResponse().getErrorMessage()).isEqualTo("Book with id 9999 does not exist.");

    }

}

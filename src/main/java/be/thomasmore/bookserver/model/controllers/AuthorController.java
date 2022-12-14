package be.thomasmore.bookserver.model.controllers;

import be.thomasmore.bookserver.model.Author;
import be.thomasmore.bookserver.model.dto.AuthorDTO;
import be.thomasmore.bookserver.model.dto.AuthorDetailedDTO;
import be.thomasmore.bookserver.model.dto.BookDTO;
import be.thomasmore.bookserver.model.dto.BookDetailedDTO;
import be.thomasmore.bookserver.services.AuthorService;
import be.thomasmore.bookserver.services.BookService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/authors")
public class AuthorController {

    @Autowired
    private AuthorService authorService;

    @Operation(summary = "list of authors in the database.",
            description = "getting <b> all </b> the authors!")
    @GetMapping("")
    public Iterable<AuthorDTO> findAll() {
        return authorService.findAll();
    }


    @Operation(summary = "get 1 author from the database.",
            description = " get <b> 1 </b> author ")
    @GetMapping("{id}")
    public AuthorDetailedDTO findOne(@PathVariable int id) {
        return authorService.findOne(id);
    }

}

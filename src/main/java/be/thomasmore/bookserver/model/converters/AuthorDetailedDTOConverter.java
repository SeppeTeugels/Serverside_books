package be.thomasmore.bookserver.model.converters;

import be.thomasmore.bookserver.model.Author;
import be.thomasmore.bookserver.model.Book;
import be.thomasmore.bookserver.model.dto.AuthorDetailedDTO;
import be.thomasmore.bookserver.model.dto.BookDetailedDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.stream.Collectors;

@Component
public class AuthorDetailedDTOConverter {

    @Autowired
    private ModelMapper modelMapper;

    public AuthorDetailedDTO convertToDto(Author author) {
        return modelMapper.map(author, AuthorDetailedDTO.class);
    }

    public Author convertToEntity(AuthorDetailedDTO authorDto, Author author) {
        modelMapper.map(authorDto, author);
        return author;
    }

}
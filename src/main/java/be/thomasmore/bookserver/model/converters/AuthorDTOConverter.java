package be.thomasmore.bookserver.model.converters;

import be.thomasmore.bookserver.model.Author;
import be.thomasmore.bookserver.model.dto.AuthorDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AuthorDTOConverter {

    @Autowired
    private ModelMapper modelMapper;

    /**
     * @param author the entity from the db
     * @return AuthorDTO object to send to the client.
     */
    public AuthorDTO convertToDto(Author author) {
        return modelMapper.map(author, AuthorDTO.class);
    }
}

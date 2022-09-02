package be.thomasmore.bookserver.services;

import be.thomasmore.bookserver.model.Genre;
import org.springframework.stereotype.Service;

@Service
public interface GenreService {
    Iterable<Genre> findAll();
}


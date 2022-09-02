package be.thomasmore.bookserver.services;

import be.thomasmore.bookserver.model.Genre;
import be.thomasmore.bookserver.repositories.GenreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GenreServiceImpl implements GenreService {

    @Autowired
    GenreRepository genreRepository;

    @Override
    public Iterable<Genre> findAll() {
        return genreRepository.findAll();
    }
}

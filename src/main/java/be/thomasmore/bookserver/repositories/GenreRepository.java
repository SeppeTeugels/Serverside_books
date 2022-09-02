package be.thomasmore.bookserver.repositories;

import be.thomasmore.bookserver.model.Genre;
import org.springframework.data.repository.CrudRepository;

public interface GenreRepository extends CrudRepository<Genre, Integer> {
}

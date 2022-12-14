package be.thomasmore.bookserver.repositories;

import be.thomasmore.bookserver.model.Author;
import org.springframework.data.repository.CrudRepository;
import org.springframework.lang.NonNull;

import java.util.List;

public interface AuthorRepository extends CrudRepository<Author, Integer> {

    @NonNull
    List<Author> findAll();
}

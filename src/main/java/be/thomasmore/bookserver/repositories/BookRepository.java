package be.thomasmore.bookserver.repositories;

import be.thomasmore.bookserver.model.Author;
import be.thomasmore.bookserver.model.Book;
import org.springframework.data.repository.CrudRepository;
import org.springframework.lang.NonNull;

import javax.validation.constraints.NotNull;
import java.util.Collection;
import java.util.List;
import java.util.Optional;


public interface BookRepository extends CrudRepository<Book, Integer> {

    Optional<Book> findByTitle(String title);

    @NonNull
    List<Book> findAll();

    List<Book> findByTitleContainingIgnoreCase(String titleKeyWord);

    //this works with the flat authors Collection (in current version of spring)
    // so I will not add the extra complexity of defining a Collection<Collection<Authors>>
    @SuppressWarnings("SpringDataRepositoryMethodParametersInspection")
    List<Book> findDistinctByAuthorsIn(Collection<Author> authors);

    //this works with the flat authors Collection (in current version of spring)
    // so I will not add the extra complexity of defining a Collection<Collection<Authors>>
    @SuppressWarnings("SpringDataRepositoryMethodParametersInspection")
    List<Book> findDistinctByAuthorsInAndIdNot(Collection<Author> authors, int bookId);
}
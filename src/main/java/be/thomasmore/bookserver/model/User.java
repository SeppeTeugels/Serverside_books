package be.thomasmore.bookserver.model;


import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@SuppressWarnings("JpaDataSourceORMInspection")
@Entity
@Table(name = "BOOKSUSER")
@Data
@NoArgsConstructor
public class User {
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_generator")
    @SequenceGenerator(name = "user_generator", sequenceName = "user_seq", allocationSize = 1)
    @Id
    private Integer id;

    String username;
    String password;
    String role;
}

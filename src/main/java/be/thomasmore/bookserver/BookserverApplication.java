package be.thomasmore.bookserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BookserverApplication {

    public static void main(String[] args) {
        SpringApplication.run(BookserverApplication.class, args);
    }

}

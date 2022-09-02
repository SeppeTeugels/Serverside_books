create sequence author_seq start with 1 increment by 1;
create table author
(
    id   integer      not null,
    name varchar(255) not null,
    primary key (id)
);

create table book_authors(
    books_id integer not null,
    authors_id integer not null,
    foreign key(authors_id) references author(id),
    foreign key(books_id) references book(id)
);

/*convert the data that is already in the author-column of the book-table*/
insert into author (ID, NAME)
select nextval('AUTHOR_SEQ'), author  from (SELECT distinct author FROM BOOK) as author;

insert into BOOK_AUTHORS (books_id, authors_id)
SELECT book.id, author.id FROM book inner join AUTHOR  on book.author=author.name;



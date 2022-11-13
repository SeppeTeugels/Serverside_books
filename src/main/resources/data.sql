insert into BOOK (TITLE) values ('Oryx and Crake'); /*1*/
insert into BOOK (TITLE) values ('The year of the flood');/*2*/
insert into BOOK (TITLE) values ('MaddAddam');/*3*/
insert into BOOK (TITLE) values ('1Q84');/*4*/
insert into BOOK (TITLE) values ('De opwindvogelkronieken');/*5*/
insert into BOOK (TITLE) values ('Design Patterns');/*6*/

insert into AUTHOR (NAME) values ('Margaret Atwood'); /*1*/
insert into AUTHOR (NAME) values ('Haruki Murakami'); /*2*/
insert into AUTHOR (NAME) values ('Erich Gamma'); /*3*/
insert into AUTHOR (NAME) values ('Richard Helm'); /*4*/
insert into AUTHOR (NAME) values ('Ralph Johnson'); /*5*/
insert into AUTHOR (NAME) values ('John Vlissides'); /*6*/

insert into BOOK_AUTHORS (BOOKS_ID, AUTHORS_ID) values (1, 1);
insert into BOOK_AUTHORS (BOOKS_ID, AUTHORS_ID) values (2, 1);
insert into BOOK_AUTHORS (BOOKS_ID, AUTHORS_ID) values (3, 1);
insert into BOOK_AUTHORS (BOOKS_ID, AUTHORS_ID) values (4, 2);
insert into BOOK_AUTHORS (BOOKS_ID, AUTHORS_ID) values (5, 2);
insert into BOOK_AUTHORS (BOOKS_ID, AUTHORS_ID) values (6, 3);
insert into BOOK_AUTHORS (BOOKS_ID, AUTHORS_ID) values (6, 4);
insert into BOOK_AUTHORS (BOOKS_ID, AUTHORS_ID) values (6, 5);
insert into BOOK_AUTHORS (BOOKS_ID, AUTHORS_ID) values (6, 6);

insert into GENRE(NAME)values ('fantasy');
insert into GENRE(NAME)values ('non-fiction');
insert into GENRE(NAME)values ('programming');

INSERT INTO BOOKSUSER (USERNAME, PASSWORD, ROLE)
VALUES ('admin', '$2a$10$9MIX8kYPkuB7uE/H5nHF8.KG6.YdjBA/voOnjSZnZDxLXL/2BIerS', 'ADMIN'); -- admin

INSERT INTO BOOKSUSER (USERNAME, PASSWORD, ROLE)
VALUES ('marie', '$2a$10$9TeBFudS7HsgCa4sSvP//O627sMq.KiTFrOr8IzrVlYw5c8aoKzNm', 'USER'); -- password

INSERT INTO BOOKSUSER (USERNAME, PASSWORD, ROLE)
VALUES ('vera', '$2y$12$KF3spKP4kgf59.6zYkmjyeYaW2.4ZxV16Grpw1FPsFnzYq68kswJ6', 'USER'); -- vera



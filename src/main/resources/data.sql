insert into BOOK (ID, TITLE)
values (nextval('BOOK_SEQ'), 'Oryx and Crake'); /*1*/

insert into BOOK (ID, TITLE)
values (nextval('BOOK_SEQ'), 'The year of the flood');/*2*/

insert into BOOK (ID, TITLE)
values (nextval('BOOK_SEQ'), 'MaddAddam');/*3*/

insert into BOOK (ID, TITLE)
values (nextval('BOOK_SEQ'), '1Q84');/*4*/

insert into BOOK (ID, TITLE)
values (nextval('BOOK_SEQ'), 'De opwindvogelkronieken');/*5*/

insert into BOOK (ID, TITLE)
values (nextval('BOOK_SEQ'), 'Design Patterns');/*6*/


insert into AUTHOR (ID, NAME)
values (nextval('AUTHOR_SEQ'), 'Margaret Atwood'); /*1*/

insert into AUTHOR (ID, NAME)
values (nextval('AUTHOR_SEQ'), 'Haruki Murakami'); /*2*/

insert into AUTHOR (ID, NAME)
values (nextval('AUTHOR_SEQ'), 'Erich Gamma'); /*3*/

insert into AUTHOR (ID, NAME)
values (nextval('AUTHOR_SEQ'), 'Richard Helm'); /*4*/

insert into AUTHOR (ID, NAME)
values (nextval('AUTHOR_SEQ'), 'Ralph Johnson'); /*5*/

insert into AUTHOR (ID, NAME)
values (nextval('AUTHOR_SEQ'), 'John Vlissides'); /*6*/


insert into BOOK_AUTHORS (BOOKS_ID, AUTHORS_ID)
values (1, 1);
insert into BOOK_AUTHORS (BOOKS_ID, AUTHORS_ID)
values (2, 1);
insert into BOOK_AUTHORS (BOOKS_ID, AUTHORS_ID)
values (3, 1);
insert into BOOK_AUTHORS (BOOKS_ID, AUTHORS_ID)
values (4, 2);
insert into BOOK_AUTHORS (BOOKS_ID, AUTHORS_ID)
values (5, 2);
insert into BOOK_AUTHORS (BOOKS_ID, AUTHORS_ID)
values (6, 3);
insert into BOOK_AUTHORS (BOOKS_ID, AUTHORS_ID)
values (6, 4);
insert into BOOK_AUTHORS (BOOKS_ID, AUTHORS_ID)
values (6, 5);
insert into BOOK_AUTHORS (BOOKS_ID, AUTHORS_ID)
values (6, 6);

insert
into GENRE
    (ID, NAME)
values (nextval('GENRE_SEQ'), 'fantasy');

insert into GENRE
    (ID, NAME)
values (nextval('GENRE_SEQ'), 'non-fiction');

insert into GENRE
    (ID, NAME)
values (nextval('GENRE_SEQ'), 'programming');

INSERT INTO BOOKSUSER (ID, USERNAME, PASSWORD, ROLE)
VALUES (nextval('USER_SEQ'), 'admin',
        '$2a$10$9MIX8kYPkuB7uE/H5nHF8.KG6.YdjBA/voOnjSZnZDxLXL/2BIerS', 'ADMIN'); --admin

INSERT INTO BOOKSUSER (ID, USERNAME, PASSWORD, ROLE)
VALUES (nextval('USER_SEQ'), 'marie',
        '$2a$10$9TeBFudS7HsgCa4sSvP//O627sMq.KiTFrOr8IzrVlYw5c8aoKzNm', 'USER'); --password

INSERT INTO BOOKSUSER (ID, USERNAME, PASSWORD, ROLE)
VALUES (nextval('USER_SEQ'), 'vera',
        '$2y$12$KF3spKP4kgf59.6zYkmjyeYaW2.4ZxV16Grpw1FPsFnzYq68kswJ6', 'USER'); --vera



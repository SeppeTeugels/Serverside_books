insert into BOOK (ID, TITLE, AUTHOR)
values (nextval('BOOK_SEQ'), 'Oryx and Crake', ''); /*1*/

insert into BOOK (ID, TITLE, AUTHOR)
values (nextval('BOOK_SEQ'), 'The year of the flood', '');/*2*/

insert into BOOK (ID, TITLE, AUTHOR)
values (nextval('BOOK_SEQ'), 'MaddAddam', '');/*3*/

insert into BOOK (ID, TITLE, AUTHOR)
values (nextval('BOOK_SEQ'), '1Q84', '');/*4*/

insert into BOOK (ID, TITLE, AUTHOR)
values (nextval('BOOK_SEQ'), 'De opwindvogelkronieken', '');/*5*/

insert into BOOK (ID, TITLE, AUTHOR)
values (nextval('BOOK_SEQ'), 'Design Patterns', '');/*6*/

insert into BOOK (ID, TITLE, AUTHOR)
values (nextval('BOOK_SEQ'), 'Anderland: De Stad Van Gouden Schaduw', ''); /*7*/

insert into BOOK (ID, TITLE, AUTHOR)
values (nextval('BOOK_SEQ'), 'Anderland:  Rivier van blauw vuur', ''); /*8*/

insert into BOOK (ID, TITLE, AUTHOR)
values (nextval('BOOK_SEQ'), 'Anderland:  Berg van zwart glas', ''); /*9*/

insert into BOOK (ID, TITLE, AUTHOR)
values (nextval('BOOK_SEQ'), 'Anderland:  Zee van zilveren licht', ''); /*10*/

insert into BOOK (ID, TITLE, AUTHOR)
values (nextval('BOOK_SEQ'), 'Neuromancer ', ''); /*11*/

insert into BOOK (ID, TITLE, AUTHOR)
values (nextval('BOOK_SEQ'), 'Snow crash', ''); /*12*/

insert into BOOK (ID, TITLE, AUTHOR)
values (nextval('BOOK_SEQ'), 'Rainbows’s end', ''); /*13*/

insert into BOOK (ID, TITLE, AUTHOR)
values (nextval('BOOK_SEQ'), 'Hard-boiled wonderland en het einde van de wereld', ''); /*14*/

insert into BOOK (ID, TITLE, AUTHOR)
values (nextval('BOOK_SEQ'), 'Ready Payer one', ''); /*15*/

insert into BOOK (ID, TITLE, AUTHOR)
values (nextval('BOOK_SEQ'), 'Refactoring', ''); /*16*/

insert into BOOK (ID, TITLE, AUTHOR)
values (nextval('BOOK_SEQ'), 'Extreme Programming Explained', ''); /*17*/

insert into BOOK (ID, TITLE, AUTHOR)
values (nextval('BOOK_SEQ'), 'Implementation patterns', ''); /*18*/

insert into BOOK (ID, TITLE, AUTHOR)
values (nextval('BOOK_SEQ'), 'Clean code', ''); /*19*/


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

insert into AUTHOR (ID, NAME)
values (nextval('AUTHOR_SEQ'), 'Tad Williams'); /*7*/

insert into AUTHOR (ID, NAME)
values (nextval('AUTHOR_SEQ'), 'William Gibson'); /*8*/

insert into AUTHOR (ID, NAME)
values (nextval('AUTHOR_SEQ'), 'Neal Stephenson'); /*9*/

insert into AUTHOR (ID, NAME)
values (nextval('AUTHOR_SEQ'), 'Vernor Vinge'); /*10*/

insert into AUTHOR (ID, NAME)
values (nextval('AUTHOR_SEQ'), 'Martin Fowler'); /*11*/

insert into AUTHOR (ID, NAME)
values (nextval('AUTHOR_SEQ'), 'Kent Beck'); /*12*/

insert into AUTHOR (ID, NAME)
values (nextval('AUTHOR_SEQ'), 'Robert C Martin'); /*13*/


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
insert into BOOK_AUTHORS (BOOKS_ID, AUTHORS_ID)
values (7, 7);
insert into BOOK_AUTHORS (BOOKS_ID, AUTHORS_ID)
values (8, 7);
insert into BOOK_AUTHORS (BOOKS_ID, AUTHORS_ID)
values (9, 7);
insert into BOOK_AUTHORS (BOOKS_ID, AUTHORS_ID)
values (10, 7);
insert into BOOK_AUTHORS (BOOKS_ID, AUTHORS_ID)
values (11, 8);
insert into BOOK_AUTHORS (BOOKS_ID, AUTHORS_ID)
values (12, 9);
insert into BOOK_AUTHORS (BOOKS_ID, AUTHORS_ID)
values (13, 10);
insert into BOOK_AUTHORS (BOOKS_ID, AUTHORS_ID)
values (14, 2);
insert into BOOK_AUTHORS (BOOKS_ID, AUTHORS_ID)
values (15, 10);
insert into BOOK_AUTHORS (BOOKS_ID, AUTHORS_ID)
values (16, 11);
insert into BOOK_AUTHORS (BOOKS_ID, AUTHORS_ID)
values (17, 12);
insert into BOOK_AUTHORS (BOOKS_ID, AUTHORS_ID)
values (18, 12);
insert into BOOK_AUTHORS (BOOKS_ID, AUTHORS_ID)
values (19, 13);


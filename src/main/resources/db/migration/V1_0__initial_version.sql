create sequence book_seq start with 1 increment by 1;
create sequence genre_seq start with 1 increment by 1;
create sequence user_seq start with 1 increment by 1;
create table book (id integer not null, author varchar(255) not null, price_in_eur integer check (price_in_eur<=200 AND price_in_eur>=0), title varchar(255) not null, primary key (id));
create table booksuser (id integer not null, password varchar(255), role varchar(255), username varchar(255), primary key (id));
create table genre (id integer not null, name varchar(255) not null, primary key (id));

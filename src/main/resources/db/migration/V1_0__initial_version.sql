create table book
(
    id           integer      not null AUTO_INCREMENT,
    author       varchar(255) not null,
    price_in_eur integer check (price_in_eur <= 200 AND price_in_eur >= 0),
    title        varchar(255) not null,
    primary key (id)
);
create table booksuser
(
    id       integer not null AUTO_INCREMENT,
    password varchar(255),
    role     varchar(255),
    username varchar(255),
    primary key (id)
);
create table genre
(
    id   integer      not null AUTO_INCREMENT,
    name varchar(255) not null,
    primary key (id)
);

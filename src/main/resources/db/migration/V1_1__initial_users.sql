
INSERT INTO BOOKSUSER (ID, USERNAME, PASSWORD, ROLE) VALUES
    (nextval('USER_SEQ'), 'admin',
    '$2a$10$9MIX8kYPkuB7uE/H5nHF8.KG6.YdjBA/voOnjSZnZDxLXL/2BIerS', 'ADMIN'); --admin

INSERT INTO BOOKSUSER (ID, USERNAME, PASSWORD, ROLE) VALUES
    (nextval('USER_SEQ'), 'marie',
    '$2a$10$9TeBFudS7HsgCa4sSvP//O627sMq.KiTFrOr8IzrVlYw5c8aoKzNm', 'USER'); --password

INSERT INTO BOOKSUSER (ID, USERNAME, PASSWORD, ROLE) VALUES
    (nextval('USER_SEQ'), 'vera',
    '$2y$12$KF3spKP4kgf59.6zYkmjyeYaW2.4ZxV16Grpw1FPsFnzYq68kswJ6', 'USER'); --vera


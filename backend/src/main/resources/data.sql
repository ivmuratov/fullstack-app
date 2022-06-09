INSERT INTO USERS (EMAIL, NAME, PASSWORD)
VALUES ('first@email.com', 'first', '$2a$10$qj3pKVdEwIQrY4daChsgFeMEZ6gx7.j3ERaiw/8Bf7sXi/QJQUNJ6'), -- 1
       ('second@email.com', 'second', '$2a$10$2nnhrNDOCrxD4tviVqQ/tOoC9b.hamqjcFtTmHvyYXh/R8goS0qVm'), -- 2
       ('third@email.com', 'third', '$2a$10$akGy05kVdAuoD1.aSo/3nueu2JyFFeiGmdfOjykJFGUSUMOfoexmC'), -- 3
       ('fourth@email.com', 'fourth', '$2a$10$9UYuWirkjKqbIVkLcd393uRXLMnD1a.z0yOzK0tTh0wgK53L19QMC'), -- 4
       ('fifth@email.com', 'fifth', '$2a$10$xSNnOKnlBNiMzvJmwU4U/uKw5chf0hALNe4J3KqgqDUP/CFND51S.'), -- 5

       ('sixth@email.com', 'sixth', '$2a$10$nuJd39ZwDR0E88yiXJ5tZe6Y3M6F1EpA2gLlbzTKn5fO27tpLkLYe'), -- 6
       ('seventh@email.com', 'seventh', '$2a$10$3rimCWDovTXQjB6lgH/qI.hSy9AUWiXtFjylfn7Vj8AEYKguYnU4G'), -- 7
       ('eighth@email.com', 'eighth', '$2a$10$8IfazZXMwOYb6iHUzamp0eQWffWJD9jFLRl3rsw/ivG025DJ/x/32'), -- 8
       ('ninth@email.com', 'ninth', '$2a$10$4ouVlrfplHt3KbNdQjvpOuU9PTIXSxGz/a.8yO6O2jgnHaUcBpD2G'), -- 9
       ('tenth@email.com', 'tenth', '$2a$10$LYILdzLhLGH3dOEkF5lLoOHfrJx7iOubSaGuZ.YbjVPGA36JG4o8i'), -- 10

       ('eleventh@email.com', 'eleventh', '$2a$10$nR5UwNnZglwDF7ApYh6LZecJ/2/zYSqlQsnrW9Ozd5VgS15nW27oq'), -- 11
       ('twelfth@email.com', 'twelfth', '$2a$10$Kfb41Dqs3ciY2rTZJ1dncOlI6GIJkRtmoqs4KPKPnNqDQjtGDiDqC'), -- 12
       ('thirteenth@email.com', 'thirteenth', '$2a$10$iiCguMM3A/HK6N7PrBya3ufGakr5OtV4KKpAfFBl67J13UXNnwQCK'), -- 13
       ('fourteenth@email.com', 'fourteenth', '$2a$10$LaIOSVUZ/pHe/Bc0Z6A1q.a6niLlVkmXdCniFDSp6qrg0eK/aeSlK'), -- 14
       ('fifteenth@email.com', 'fifteenth', '$2a$10$zlM91LwE49T8wkphjAUsv.cfy..zijI8eMOd9L.dvNYDoUefajeDS'); -- 15

INSERT INTO USER_ROLE (ROLE, USER_ID)
VALUES ('ADMIN', 1),
       ('USER', 1),
       ('USER', 2),
       ('USER', 3),
       ('USER', 4),
       ('USER', 5),

       ('USER', 6),
       ('USER', 7),
       ('USER', 8),
       ('USER', 9),
       ('USER', 10),

       ('USER', 11),
       ('USER', 12),
       ('USER', 13),
       ('USER', 14),
       ('USER', 15);


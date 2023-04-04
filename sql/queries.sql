-- Inserindo filme na tabela
INSERT INTO movies (name, category, duration, price)
VALUES ('movie name', 'movie category', 120, 10);

-- Listando todos os filmes da tabela
SELECT * FROM movies;

-- Filtrar filmes por id
SELECT * FROM movies
WHERE id = 1;

-- Deletar filme por id
DELETE FROM movies
WHERE id = 1;
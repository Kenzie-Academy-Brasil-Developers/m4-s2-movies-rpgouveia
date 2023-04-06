import { Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "./database";
import { iMovie, iMovieResult } from "./interfaces";
import format from "pg-format";

const createMovie = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { body: payload } = request;
  const query: string = `
    INSERT INTO movies (name, category, duration, price)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const queryConfig: QueryConfig = {
    text: query,
    values: Object.values(payload),
  };

  const queryResult: iMovieResult = await client.query(queryConfig);
  const movie: iMovie = queryResult.rows[0];

  return response.status(201).json(movie);
};

const listMovies = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const query: string = `SELECT * FROM movies;`;
  const queryResult: iMovieResult = await client.query(query);

  return response.status(200).json(queryResult.rows);
};

const retrieveMovie = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const movie: iMovie = response.locals.movie;
  return response.status(200).json(movie);
};

const updateMovie = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const movieData: Partial<iMovie> = request.body;
  const id = Number(request.params.id);
  const query: string = format(
    `UPDATE movies SET(%I) = ROW(%L) WHERE id = $1 RETURNING *;`,
    Object.keys(movieData),
    Object.values(movieData)
  );
  const queryConfig: QueryConfig = {
    text: query,
    values: [id]
  };
  const queryResult: iMovieResult = await client.query(queryConfig);
  return response.status(200).json(queryResult.rows[0]);
};

const deleteMovie = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const id = Number(request.params.id);
  const query: string = `DELETE FROM movies WHERE id = $1;`;
  const queryConfig: QueryConfig = {
    text: query,
    values: [id]
  };
  await client.query(queryConfig)
  return response.status(204).send();
};

export { createMovie, listMovies, retrieveMovie, updateMovie, deleteMovie };

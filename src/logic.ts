import { Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "./database";
import { iMovie, iMovieResult } from "./interfaces";

const insertMovie = async (request: Request, response: Response): Promise<Response> => {
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

const queryMovies = async (request: Request, response: Response): Promise<Response> => {
  const query: string = `SELECT * FROM movies;`;
  const queryResult: iMovieResult = await client.query(query);

  return response.status(200).json(queryResult.rows);
}

export {
  insertMovie,
  queryMovies
}
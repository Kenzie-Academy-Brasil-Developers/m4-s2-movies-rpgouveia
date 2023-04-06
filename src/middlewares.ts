import { NextFunction, Request, Response } from "express"
import { QueryConfig } from "pg";
import { iMovieResult } from "./interfaces";
import { client } from "./database";

const checkMovieId = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {
  const id = Number(request.params.id);
  const query: string = `SELECT * FROM movies WHERE id = $1;`;
  const queryConfig: QueryConfig = { text: query, values: [id] };
  const queryResult: iMovieResult = await client.query(queryConfig);
  if (queryResult.rowCount === 0) {
    return response.status(404).json({
      error: "Movie not found!"
    })
  };
  response.locals.movie = queryResult.rows[0];
  return next();
};

const checkMovieName = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {
  const movie = request.body;
  const query = `SELECT * FROM movies WHERE name = $1;`;
  const queryConfig: QueryConfig = { text: query, values: [movie.name]};
  const queryResult: iMovieResult = await client.query(queryConfig);
  if (queryResult.rows.length > 0) {
    return response.status(409).json({
      error: "Movie name already exists!"
    })
  }
  return next();
};

export {
  checkMovieId,
  checkMovieName
};
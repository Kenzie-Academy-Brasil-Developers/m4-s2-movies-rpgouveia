import { QueryResult } from "pg";

interface iMovie {
  id: number,
  name: string,
  category: string,
  duration: number,
  price: number
};

type iMovieRegistered = Omit<iMovie, 'id'>;
type iMovieResult = QueryResult<iMovie>;

export {
  iMovie,
  iMovieRegistered,
  iMovieResult
};
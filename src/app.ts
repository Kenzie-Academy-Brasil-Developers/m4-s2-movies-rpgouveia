import express, { Application } from "express";
import { startDatabase } from "./database";
import { createMovie, deleteMovie, listMovies, retrieveMovie, updateMovie } from "./logic";
import { checkMovieId, checkMovieName } from "./middlewares";

const app: Application = express();
app.use(express.json());

app.post("/movies", checkMovieName, createMovie);
app.get("/movies", listMovies);
app.get("/movies/:id", checkMovieId, retrieveMovie);
app.patch("/movies/:id", checkMovieId, checkMovieName, updateMovie);
app.delete("/movies/:id", checkMovieId, deleteMovie);

const port: number = 3000;
const runningMessage = `Server running on http://localhost:${port}`;
app.listen(port, async () => {
  await startDatabase();
  console.log(runningMessage)
});
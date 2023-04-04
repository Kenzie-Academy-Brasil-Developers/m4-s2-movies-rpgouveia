import express, { Application } from "express";
import { startDatabase } from "./database";
import { insertMovie, queryMovies } from "./logic";

const app: Application = express();
app.use(express.json());

app.post("/movies", insertMovie);
app.get("/movies", queryMovies);

const port: number = 3000;
const runningMessage = `Server running on http://localhost:${port}`;
app.listen(port, async () => {
  await startDatabase();
  console.log(runningMessage)
});
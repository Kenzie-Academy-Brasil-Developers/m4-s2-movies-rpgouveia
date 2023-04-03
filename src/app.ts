import express, { Application } from "express";

const app: Application = express();
app.use(express.json());

const port: number = 3000;
const runningMessage = `Server running on http://localhost:${port}`;
app.listen(port, () => console.log(runningMessage));
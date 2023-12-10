import "reflect-metadata";
import express, { Express } from "express";
import dotenv from "dotenv";
import core from "cors";
import { AppDataSource } from "./server";
import songRouter from "./routes/song";
import playlistRouter from "./routes/playlist";
import createDataRouter from "./routes/createData";

dotenv.config();

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;
const app: Express = express();

app.use(express.json());

app.use(
  core({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

AppDataSource.initialize()
  .then(async (connection) => {
    app.use(`${process.env.PATH_DATA || ""}/create-data`, createDataRouter);
    app.use(`${process.env.PATH_DATA || ""}/song`, songRouter);
    app.use(`${process.env.PATH_DATA || ""}/playlist`, playlistRouter);

    app.listen(port, () => {
      console.info("Express server listening on http://localhost:3004");
    });
  })
  .catch((error) => console.log("TypeORM connection error: ", error));

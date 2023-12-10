import express from "express";
import controller from "../api/song/song.controller";

var songRouter = express.Router();

songRouter.route("/").all().get(controller.getSong);

export default songRouter;

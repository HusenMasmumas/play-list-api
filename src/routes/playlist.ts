import express from "express";
import controller from "../api/playlist/playlist.controller";

var playlistRouter = express.Router();

playlistRouter
  .route("/")
  .all()
  .get(controller.getPlaylist)
  .post(controller.postPlaylist);

export default playlistRouter;

import express from "express";
import controller from "../api/create-data/createData.controller";

var createDataRouter = express.Router();

createDataRouter.route("/").all().get(controller.createData);

export default createDataRouter;

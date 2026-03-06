import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "../shared/http/routes.js";
import { putTraceIdInRequest } from "../shared/http/middlewares/index.js";

export function createApp() {
  const app = express();
  app.use(putTraceIdInRequest);
  app.use("/v1", router);
  app.use(bodyParser.json());
  app.use(cors());

  return app;
}
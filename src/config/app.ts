import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "../shared/http/routes.js";
import { putTraceIdInRequest } from "../shared/http/middlewares/index.js";
import { errorMiddleware } from "../shared/http/middlewares/app-error.middleware.js";
import { swaggerUi, swaggerDocument } from "./swagger.js";

export function createApp() {
  const app = express();
  app.use(putTraceIdInRequest);
  app.use("/v1", router);
  app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(errorMiddleware);

  return app;
}
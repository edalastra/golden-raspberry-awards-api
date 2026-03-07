import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "../shared/http/routes.js";
import { putTraceIdInRequest } from "../shared/http/middlewares/index.js";
import { errorMiddleware } from "../shared/http/middlewares/app-error.middleware.js";
import { swaggerUi, swaggerDocument } from "./swagger.js";
import { notFound } from "../shared/http/middlewares/not-found.middleware.js";

export function createApp() {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(putTraceIdInRequest);
  app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use(router);  
  app.use(notFound);
  app.use(errorMiddleware);

  return app;
}
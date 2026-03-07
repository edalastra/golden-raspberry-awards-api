import { NextFunction, Request, Response } from "express";
import { logger } from "../../utils/logger.js";
import { AppError } from "../../errors/app.error.js";
import env from "../../env.js";

export const errorMiddleware = (
  error: Error,
  request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  logger.error(JSON.stringify(error));

  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
      traceId: error.traceId,
      version: env.APP_VERSION
    });
  }

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
    version: env.APP_VERSION
  });
};

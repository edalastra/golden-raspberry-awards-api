import { NextFunction, Request, Response } from "express";
import env from "../../env.js";

export const notFound = (
    request: Request,
    response: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
) => {
    return response.status(404).json({
        status: "error",
        message: "Route not found.",
        version: env.APP_VERSION
    });
};

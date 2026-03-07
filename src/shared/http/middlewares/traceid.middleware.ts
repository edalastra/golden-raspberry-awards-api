import crypto from "crypto";
import { NextFunction, Request, Response } from "express";

export function putTraceIdInRequest(req: Request, res: Response, next: NextFunction): void {
    req.headers["x-trace-id"] = crypto.randomUUID();
    console.log("Incoming request with trace ID:", req.headers["x-trace-id"], req.method, req.url);
    next();
}
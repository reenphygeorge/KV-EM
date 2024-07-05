import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/http.exception";
import { writeFile } from "fs";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  const log = `[${new Date().toString()}] ${req.method} ${req.url}\n${
    err.stack
  }\n`;
  writeFile(".err.logs", log, { flag: "a+" }, (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
      return;
    }
  });
  if (err instanceof HttpException) {
    if (err.errors)
      return res
        .status(err.status)
        .json({ error: err.message, errors: err.errors });
    return res.status(err.status).json({ error: err.message });
  }
  res.status(500).json({ error: err.message });
  next();
};

export { errorHandler };

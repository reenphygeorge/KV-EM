import { NextFunction, Request } from "express";
import { writeFile } from "fs";

const loggerMiddleware = (req: Request, _, next: NextFunction) => {
  const log = `[${new Date().toString()}] ${req.method} ${req.url}\n`;
  writeFile(".logs", log, { flag: "a+" }, (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
      return;
    }
  });
  console.log(
    "\x1b[34m%s\x1b[0m",
    `[${new Date().toString()}]`,
    "\x1b[32m%s\x1b[0m",
    `${req.method}`,
    "\x1b[33m%s\x1b[0m",
    `${req.url}`
  );
  next();
};

export { loggerMiddleware };

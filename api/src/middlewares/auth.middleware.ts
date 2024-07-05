import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";
import JwtPayload from "../utils/jwtPayload";
import RequestWithUser from "../utils/requestWithUser";

const authMiddleware = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    const payload = verify(token, "jwt_string");
    req.name = (payload as JwtPayload).name;
    req.email = (payload as JwtPayload).email;
    req.role = (payload as JwtPayload).role;
    return next();
  } catch (error) {
    return next(error);
  }
};

export { authMiddleware };

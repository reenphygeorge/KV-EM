import { NextFunction } from "express";
import { verify } from "jsonwebtoken";
import JwtPayload from "../utils/jwtPayload";
import RequestWithUser from "../utils/requestWithUser";
import HttpException from "../exceptions/http.exception";

const authMiddleware = (req: RequestWithUser, _, next: NextFunction) => {
  try {
    const tokenHeader = req.header("Authorization");
    if (!tokenHeader) throw new HttpException(403, "Not authorized");
    const token = tokenHeader.includes("Bearer")
      ? tokenHeader.replace("Bearer ", "")
      : tokenHeader;
    const payload = verify(token, process.env.JWT_SECRET);
    req.name = (payload as JwtPayload).name;
    req.email = (payload as JwtPayload).email;
    req.role = (payload as JwtPayload).role;
    return next();
  } catch (error) {
    return next(error);
  }
};

export { authMiddleware };

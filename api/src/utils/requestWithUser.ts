import { Request } from "express";
import { Role } from "./role.enum";

export default interface RequestWithUser extends Request {
  name: string;
  email: string;
  role: Role;
}

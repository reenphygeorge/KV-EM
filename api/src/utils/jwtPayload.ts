import { Role } from "./role.enum";

export default class JwtPayLoad {
  name: string;
  email: string;
  role: Role;
}

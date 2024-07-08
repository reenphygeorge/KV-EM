import { NextFunction, Router, Response, Request } from "express";
import { DepartmentService } from "../service/department.service";
import { authMiddleware } from "../middlewares/auth.middleware";
import RequestWithUser from "../utils/requestWithUser";
import HttpException from "../exceptions/http.exception";
import { Role } from "../utils/role.enum";
import { plainToInstance } from "class-transformer";
import {
  CreateDepartmentDto,
  DepartmentResponseDto,
  UpdateDepartmentDto,
} from "../dto/department.dto";
import { validate } from "class-validator";
import { errorFormatter } from "../utils/errorFormatter.utils";

export default class DepartmentController {
  public router: Router;

  constructor(private departmentService: DepartmentService) {
    this.router = Router();

    this.router.get("/", authMiddleware, this.getAllDepartments);
    this.router.get("/:id", authMiddleware, this.getDepartmentById);
    this.router.post("/", authMiddleware, this.createDepartment);
    this.router.patch("/", authMiddleware, this.updateDepartment);
    this.router.delete("/:id", authMiddleware, this.deleteDepartment);
  }
  getAllDepartments = async (_, res: Response) => {
    const departments = await this.departmentService.getAllDepartments();
    res.json(plainToInstance(DepartmentResponseDto, departments));
  };

  getDepartmentById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = Number(req.params.id);
      const department = await this.departmentService.getDepartmentById(id);
      if (!department) {
        throw new HttpException(404, "Department not found");
      }
      res.json(plainToInstance(UpdateDepartmentDto, department));
    } catch (error) {
      next(error);
    }
  };

  createDepartment = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (req.role !== Role.HR) {
        throw new HttpException(403, "Invalid Access");
      }
      const departmentDto = plainToInstance(CreateDepartmentDto, req.body);
      const errors = await validate(departmentDto);

      if (errors.length) {
        const formattedError = errorFormatter(errors);
        throw new HttpException(400, "Validation Error", formattedError);
      }

      const departmentData = await this.departmentService.createNewDepartment(
        departmentDto.name
      );

      res.status(201).json({
        success: true,
        message: "Department Created!",
        data: departmentData,
      });
    } catch (error) {
      next(error);
    }
  };

  updateDepartment = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (req.role !== Role.HR) {
        throw new HttpException(403, "Invalid Access");
      }
      const departmentDto = plainToInstance(UpdateDepartmentDto, req.body);
      const errors = await validate(departmentDto);

      if (errors.length) {
        const formattedError = errorFormatter(errors);
        throw new HttpException(400, "Validation Error", formattedError);
      }

      const departmentData = await this.departmentService.updateDepartment(
        departmentDto
      );
      res.json({
        sucess: true,
        message: "Department Updated!",
        data: departmentData,
      });
    } catch (err) {
      next(err);
    }
  };

  deleteDepartment = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (req.role !== Role.HR) {
        throw new HttpException(403, "Invalid Access");
      }
      const id = Number(req.params.id);
      await this.departmentService.deleteDepartment(id);
      res.json({ sucess: true, message: "Department Deleted!" });
    } catch (err) {
      next(err);
    }
  };
}

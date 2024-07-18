import { plainToInstance } from "class-transformer";
import HttpException from "../exceptions/http.exception";
import EmployeeService from "../service/employee.service";
import { NextFunction, Request, Response, Router } from "express";
import {
  CreateEmployeeDto,
  EmployeeResponseDto,
  LoginEmployeeDto,
  UpdateEmployeeDto,
} from "../dto/employee.dto";
import { validate } from "class-validator";
import { authMiddleware } from "../middlewares/auth.middleware";
import RequestWithUser from "../utils/requestWithUser";
import { Role } from "../utils/role.enum";
import { errorFormatter } from "../utils/errorFormatter.utils";

export default class EmployeeController {
  public router: Router;

  constructor(private employeeService: EmployeeService) {
    this.router = Router();

    this.router.get("/", authMiddleware, this.getAllEmployees);
    this.router.get("/:id", authMiddleware, this.getEmployeeById);
    this.router.post("/", authMiddleware, this.createEmployee);
    this.router.put("/", authMiddleware, this.updateEmployee);
    this.router.delete("/:id", authMiddleware, this.deleteEmployee);
    this.router.post("/login", this.loginEmployee);
  }
  getAllEmployees = async (_, res: Response) => {
    const employees = await this.employeeService.getAllEmployees();
    res.json(plainToInstance(EmployeeResponseDto, employees));
  };

  getEmployeeById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const employees = await this.employeeService.getEmployeeById(id);
      if (!employees) {
        throw new HttpException(404, "Employee not found");
      }
      res.json(plainToInstance(EmployeeResponseDto, employees));
    } catch (error) {
      next(error);
    }
  };

  createEmployee = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (req.role !== Role.HR) {
        throw new HttpException(403, "Invalid Access");
      }
      const employeeDto = plainToInstance(CreateEmployeeDto, req.body);
      const errors = await validate(employeeDto);

      if (errors.length) {
        const formattedError = errorFormatter(errors);
        throw new HttpException(400, "Validation Error", formattedError);
      }

      const employeeData = await this.employeeService.createNewEmployee(
        employeeDto.name,
        employeeDto.email,
        employeeDto.address,
        employeeDto.password,
        employeeDto.status,
        employeeDto.experience,
        employeeDto.joinDate,
        employeeDto.role,
        employeeDto.department
      );
      res.status(201).json({
        success: true,
        message: "Employee Created!",
        data: plainToInstance(EmployeeResponseDto, employeeData),
      });
    } catch (error) {
      next(error);
    }
  };

  updateEmployee = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (req.role !== Role.HR) {
        throw new HttpException(403, "Invalid Access");
      }
      const employeeDto = plainToInstance(UpdateEmployeeDto, req.body);
      const errors = await validate(employeeDto);

      if (errors.length) {
        const formattedError = errorFormatter(errors);
        throw new HttpException(400, "Validation Error", formattedError);
      }

      const updateData = await this.employeeService.updateEmployee(employeeDto);
      res.json({
        sucess: true,
        message: "Employee Updated!",
        data: updateData,
      });
    } catch (err) {
      next(err);
    }
  };

  deleteEmployee = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (req.role !== Role.HR) {
        throw new HttpException(403, "Invalid Access");
      }
      const id = Number(req.params.id);
      await this.employeeService.deleteEmployee(id);
      res.json({ sucess: true, message: "Employee Deleted!" });
    } catch (err) {
      next(err);
    }
  };

  loginEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const loginDto = plainToInstance(LoginEmployeeDto, req.body);
      const errors = await validate(loginDto);

      if (errors.length) {
        let constraints = [];

        constraints = errors.map(
          ({ constraints }) => Object.values(constraints)[0]
        );
        throw new HttpException(400, "Validation Error", [...constraints]);
      }
      const token = await this.employeeService.loginEmployee(
        loginDto.email,
        loginDto.password
      );
      res.json({ sucess: true, token });
    } catch (error) {
      next(error);
    }
  };
}

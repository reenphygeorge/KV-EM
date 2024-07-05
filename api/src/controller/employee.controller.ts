import { plainToInstance } from "class-transformer";
import HttpException from "../exceptions/http.exception";
import EmployeeService from "../service/employee.service";
import { NextFunction, Request, Response, Router } from "express";
import {
  CreateEmployeeDto,
  LoginEmployeeDto,
  UpdateEmployeeDto,
} from "../dto/employee.dto";
import { validate } from "class-validator";
import { authMiddleware } from "../middlewares/auth.middleware";

export default class EmployeeController {
  public router: Router;

  constructor(private employeeService: EmployeeService) {
    this.router = Router();

    this.router.get("/", this.getAllEmployees);
    this.router.get("/:id", authMiddleware, this.getEmployeeById);
    this.router.post("/", authMiddleware, this.createEmployee);
    this.router.patch("/", this.updateEmployee);
    this.router.delete("/:id", this.deleteEmployee);
    this.router.post("/login", this.loginEmployee);
  }
  getAllEmployees = async (_, res: Response) => {
    const employees = await this.employeeService.getAllEmployees();
    res.json(employees);
  };

  getEmployeeById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const employees = await this.employeeService.getEmployeeById(id);
      if (!employees) {
        throw new HttpException(404, "Employee not found");
      }
      res.json(employees);
    } catch (error) {
      next(error);
    }
  };

  createEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employeeDto = plainToInstance(CreateEmployeeDto, req.body);
      const errors = await validate(employeeDto);

      if (errors.length) {
        let subConstraints = [];
        let constraints = [];

        if (!errors[0].children.length)
          constraints = errors.map(
            ({ constraints }) => Object.values(constraints)[0]
          );
        else if (errors[0].children.length)
          subConstraints = errors[0].children.map(
            ({ constraints }) => Object.values(constraints)[0]
          );

        throw new HttpException(400, "Validation Error", [
          ...constraints,
          ...subConstraints,
        ]);
      }

      const employeeData = await this.employeeService.createNewEmployee(
        employeeDto.name,
        employeeDto.email,
        employeeDto.age,
        employeeDto.address,
        employeeDto.password,
        employeeDto.role
      );
      res.status(201).json(employeeData);
    } catch (error) {
      next(error);
    }
  };

  updateEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.body.id);
      const employeeDto = plainToInstance(UpdateEmployeeDto, req.body);
      const errors = await validate(employeeDto);

      if (errors.length) {
        let subConstraints = [];
        let constraints = [];

        if (!errors[0].children.length)
          constraints = errors.map(
            ({ constraints }) => Object.values(constraints)[0]
          );
        else if (errors[0].children.length)
          subConstraints = errors[0].children.map(
            ({ constraints }) => Object.values(constraints)[0]
          );

        throw new HttpException(400, "Validation Error", [
          ...constraints,
          ...subConstraints,
        ]);
      }

      await this.employeeService.updateEmployee(id, { ...req.body });
      res.json({ sucess: true, message: "Employee Updated!" });
    } catch (err) {
      next(err);
    }
  };

  deleteEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
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

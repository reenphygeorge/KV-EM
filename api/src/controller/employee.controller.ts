import HttpException from "../exceptions/http.exception";
import EmployeeService from "../service/employee.service";
import { NextFunction, Request, Response, Router } from "express";

export default class EmployeeController {
  public router: Router;

  constructor(private employeeService: EmployeeService) {
    this.router = Router();

    this.router.get("/", this.getAllEmployees);
    this.router.get("/:id", this.getEmployeeById);
    this.router.post("/", this.createEmployee);
    this.router.patch("/", this.updateEmployee);
    this.router.delete("/:id", this.deleteEmployee);
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
      const name = req.body.name;
      const email = req.body.email;
      const emailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!email.match(emailFormat)) {
        throw new HttpException(400, "Invalid email format");
      }
      const line1 = req.body.address.line1;
      const pincode = req.body.address.pincode;
      const employeeData = await this.employeeService.createNewEmployee(
        name,
        email,
        line1,
        pincode
      );
      res.status(201).json(employeeData);
    } catch (error) {
      next(error);
    }
  };

  updateEmployee = async (req: Request, res: Response) => {
    const id = Number(req.body.id);
    await this.employeeService.updateEmployee(id, { ...req.body });
    res.json({ sucess: true, message: "Employee Updated!" });
  };

  deleteEmployee = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await this.employeeService.deleteEmployee(id);
    res.json({ sucess: true, message: "Employee Deleted!" });
  };
}

import { Employee } from "../entity/employee.entity";
import EmployeeService from "../service/employee.service";
import express from "express";

export default class EmployeeController {
  private employeeService: EmployeeService;
  public router: express.Router;

  constructor(employeeService: EmployeeService) {
    this.employeeService = employeeService;
    this.router = express.Router();

    this.router.get("/", this.getAllEmployees);
    this.router.get("/:id", this.getEmployeeById);
    this.router.post("/", this.createEmployee);
    this.router.patch("/", this.updateEmployee);
    this.router.delete("/:id", this.deleteEmployee);
  }

  getAllEmployees = async (_, res: express.Response) => {
    const employees = await this.employeeService.getAllEmployees();
    res.json(employees);
  };

  getEmployeeById = async (req: express.Request, res: express.Response) => {
    const id = Number(req.params.id);
    const employees = await this.employeeService.getEmployeeById(id);
    res.json(employees);
  };

  createEmployee = async (req: express.Request, res: express.Response) => {
    const newEmployee = new Employee();
    newEmployee.email = req.body.email;
    newEmployee.name = req.body.name;
    const employeeData = await this.employeeService.createNewEmployee(
      newEmployee
    );
    res.status(201).json(employeeData);
  };

  updateEmployee = async (req: express.Request, res: express.Response) => {
    const id = Number(req.body.id);
    await this.employeeService.updateEmployee(id, { ...req.body });
    res.json({ sucess: true, message: "Employee Updated!" });
  };

  deleteEmployee = async (req: express.Request, res: express.Response) => {
    const id = Number(req.params.id);
    await this.employeeService.deleteEmployee(id);
    res.json({ sucess: true, message: "Employee Deleted!" });
  };
}

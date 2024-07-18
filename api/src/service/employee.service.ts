import { hash, compare } from "bcrypt";
import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import HttpException from "../exceptions/http.exception";
import EmployeeRepository from "../repository/employee.repository";
import { Role } from "../utils/role.enum";
import JwtPayload from "../utils/jwtPayload";
import { sign } from "jsonwebtoken";
import Department from "../entity/department.entity";
import { CreateEmployeeDto, UpdateEmployeeDto } from "../dto/employee.dto";
import { DepartmentService } from "./department.service";
import { Status } from "../utils/status.enum";

export default class EmployeeService {
  constructor(
    private employeeRepository: EmployeeRepository,
    private departmentService: DepartmentService
  ) {
    this.employeeRepository = employeeRepository;
    this.departmentService = departmentService;
  }

  public getAllEmployees = async () => this.employeeRepository.find();

  public getEmployeeById = async (id: number) =>
    this.employeeRepository.findOneBy({ id }, ["address", "department"]);

  public createNewEmployee = async (
    name: string,
    email: string,
    address: Address,
    password: string,
    status: Status,
    experience: number,
    joinDate: Date,
    role: Role,
    department: Department
  ) => {
    const departmentData = await this.departmentService.getDepartmentByName(
      department.name
    );
    if (!departmentData) {
      throw new HttpException(404, "Department Not Found");
    }
    const newEmployee = new Employee();
    newEmployee.name = name;
    newEmployee.email = email;
    newEmployee.address = address;
    newEmployee.password = await hash(password, 10);
    newEmployee.role = role;
    newEmployee.status = status;
    newEmployee.experience = experience;
    newEmployee.joinDate = joinDate;
    newEmployee.department = departmentData;
    return await this.employeeRepository.save(newEmployee);
  };

  public updateEmployee = async (employee: UpdateEmployeeDto) => {
    const employeeData = await this.getEmployeeById(employee.id);
    if (employee.address) employee.address.id = employeeData.address.id;
    if (employee.department) {
      const departmentData = await this.departmentService.getDepartmentByName(
        employee.department.name
      );
      if (!departmentData) {
        throw new HttpException(404, "Department Not Found");
      }
      employee.department = departmentData;
    }
    if (!employeeData) {
      throw new HttpException(404, "Employee Not Found");
    }
    return await this.employeeRepository.save(employee);
  };

  public deleteEmployee = async (id: number) => {
    const employeeData = await this.getEmployeeById(id);
    if (!employeeData) {
      throw new HttpException(404, "Employee Not Found");
    }
    this.employeeRepository.remove(employeeData);
    return employeeData;
  };

  public loginEmployee = async (email: string, password: string) => {
    const employee = await this.employeeRepository.findOneBy({ email });
    if (!employee) {
      throw new HttpException(404, "Employee Not Found");
    }

    if (await compare(password, employee.password)) {
      const payload: JwtPayload = {
        name: employee.name,
        email: employee.email,
        role: employee.role,
      };
      const token = sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRY,
      });
      return token;
    } else {
      throw new HttpException(403, "Wrong Credentials");
    }
  };
}

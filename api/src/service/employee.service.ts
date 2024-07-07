import { hash, compare } from "bcrypt";
import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import HttpException from "../exceptions/http.exception";
import EmployeeRepository from "../repository/employee.repository";
import { Role } from "../utils/role.enum";
import JwtPayload from "../utils/jwtPayload";
import { sign } from "jsonwebtoken";
import Department from "../entity/department.entity";
import DepartmentRepository from "../repository/department.repository";

export default class EmployeeService {
  constructor(
    private employeeRepository: EmployeeRepository,
    private departmentRepository: DepartmentRepository
  ) {
    this.employeeRepository = employeeRepository;
    this.departmentRepository = departmentRepository;
  }

  public getAllEmployees = async () => this.employeeRepository.find();

  public getEmployeeById = async (id: number) =>
    this.employeeRepository.findOneBy({ id }, ["address", "department"]);

  public createNewEmployee = async (
    name: string,
    email: string,
    age: number,
    address: Address,
    password: string,
    role: Role,
    department: Department
  ) => {
    const departmentData = await this.departmentRepository.findOneBy({
      name: department.name,
    });
    if (!departmentData) {
      throw new HttpException(404, "Department Not Found");
    }
    const newEmployee = new Employee();
    newEmployee.name = name;
    newEmployee.email = email;
    newEmployee.age = age;
    newEmployee.address = address;
    newEmployee.password = await hash(password, 10);
    newEmployee.role = role;
    newEmployee.department = departmentData;
    return await this.employeeRepository.save(newEmployee);
  };

  public updateEmployee = async (id: number, employee: Partial<Employee>) => {
    const employeeData = await this.getEmployeeById(id);
    if (!employeeData) {
      throw new HttpException(404, "Employee Not Found");
    }
    await this.employeeRepository.update(id, employee);
  };

  public deleteEmployee = async (id: number) => {
    const employeeData = await this.getEmployeeById(id);
    if (!employeeData) {
      throw new HttpException(404, "Employee Not Found");
    }
    this.employeeRepository.remove(employeeData);
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

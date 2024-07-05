import { hash, compare } from "bcrypt";
import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import HttpException from "../exceptions/http.exception";
import EmployeeRepository from "../repository/employee.repository";
import { Role } from "../utils/role.enum";
import JwtPayload from "../utils/jwtPayload";
import { sign } from "jsonwebtoken";

export default class EmployeeService {
  constructor(private employeeRepository: EmployeeRepository) {
    this.employeeRepository = employeeRepository;
  }

  public getAllEmployees = async () => this.employeeRepository.find();

  public getEmployeeById = async (id: number) =>
    this.employeeRepository.findOneBy({ id }, ["address"]);

  public createNewEmployee = async (
    name: string,
    email: string,
    age: number,
    address: Address,
    password: string,
    role: Role
  ) => {
    const newEmployee = new Employee();
    const newAddress = new Address();
    newEmployee.name = name;
    newEmployee.email = email;
    newEmployee.age = age;
    newAddress.line1 = address.line1;
    newAddress.pincode = address.pincode;
    newEmployee.address = newAddress;
    newEmployee.password = await hash(password, 10);
    newEmployee.role = role;
    const response = await this.employeeRepository.save(newEmployee);
    (await response).password;
  };

  public updateEmployee = async (id: number, employee: Partial<Employee>) => {
    const employeeData = await this.getEmployeeById(id);
    if (!employeeData) {
      throw new HttpException(404, "Employee Not Found");
    }
    this.employeeRepository.update(id, employee);
  };

  public deleteEmployee = async (id: number) => {
    const employeeData = await this.getEmployeeById(id);
    if (!employeeData) {
      throw new HttpException(404, "Employee Not Found");
    }
    this.employeeRepository.delete(id);
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
      const token = sign(payload, "jwt_string", { expiresIn: "1h" });
      return token;
    } else {
      throw new HttpException(403, "Wrong Credentials");
    }
  };
}

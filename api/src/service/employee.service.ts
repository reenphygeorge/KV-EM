import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import EmployeeRepository from "../repository/employee.repository";

export default class EmployeeService {
  // private employeeRepository: EmployeeRepository;

  constructor(private employeeRepository: EmployeeRepository) {
    // this.employeeRepository = employeeRepository;
  }

  public getAllEmployees = async () => this.employeeRepository.find();

  public getEmployeeById = async (id: number) =>
    this.employeeRepository.findOneBy({ id });

  public createNewEmployee = async (
    name: string,
    email: string,
    line1: string,
    pincode: string
  ) => {
    const newEmployee = new Employee();
    const newAddress = new Address();
    newEmployee.name = name;
    newEmployee.email = email;
    newAddress.line1 = line1;
    newAddress.pincode = pincode;
    newEmployee.address = newAddress;
    return this.employeeRepository.save(newEmployee);
  };

  public updateEmployee = async (id: number, employee: Partial<Employee>) => {
    const employeeData = this.getEmployeeById(id);
    if (!employeeData) {
      //   return { sucess: false, error: "Employee not found" };
      // throw Error
    }
    this.employeeRepository.update(id, employee);
    // return this.getEmployeeById(id);
  };

  public deleteEmployee = async (id: number) => {
    const employeeData = this.getEmployeeById(id);
    if (!employeeData) {
      //   return { sucess: false, error: "Employee not found" };
      // throw Error
    }
    this.employeeRepository.delete(id);
  };
}

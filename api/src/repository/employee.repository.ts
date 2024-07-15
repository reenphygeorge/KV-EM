import { Repository } from "typeorm";
import Employee from "../entity/employee.entity";
import { UpdateEmployeeDto } from "../dto/employee.dto";

export default class EmployeeRepository {
  constructor(private employeeRepository: Repository<Employee>) {
    this.employeeRepository = employeeRepository;
  }

  find = async () =>
    await this.employeeRepository.find({
      relations: { address: true, department: true },
    });

  findOneBy = async (filter: Partial<Employee>, relations?: string[]) =>
    await this.employeeRepository.findOne({
      where: filter,
      relations,
    });

  save = async (newEmployee: Partial<Employee>) =>
    await this.employeeRepository.save(newEmployee);

  remove = async (employee: Employee) =>
    await this.employeeRepository.softRemove(employee);
}

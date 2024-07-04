import { Repository } from "typeorm";
import { Employee } from "../entity/employee.entity";

export default class EmployeeRepository {
  private employeeRepository: Repository<Employee>;

  constructor(employeeRepository: Repository<Employee>) {
    this.employeeRepository = employeeRepository;
  }

  find = async () => await this.employeeRepository.find();

  findOneBy = async (filter: Partial<Employee>) =>
    await this.employeeRepository.findOne({ where: filter });

  save = async (newEmployee: Employee) =>
    await this.employeeRepository.save(newEmployee);

  update = async (id: number, employee: Partial<Employee>) =>
    await this.employeeRepository.update({ id }, employee);

  delete = async (id: number) => await this.employeeRepository.softDelete(id);
}
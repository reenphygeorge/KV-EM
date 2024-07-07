import { Repository } from "typeorm";
import Employee from "../entity/employee.entity";

export default class EmployeeRepository {
  constructor(private employeeRepository: Repository<Employee>) {
    this.employeeRepository = employeeRepository;
  }

  find = async () =>
    await this.employeeRepository.find({
      relations: { address: true },
    });

  findOneBy = async (filter: Partial<Employee>, relations?: string[]) =>
    await this.employeeRepository.findOne({
      where: filter,
      relations,
    });

  save = async (newEmployee: Employee) =>
    await this.employeeRepository.save(newEmployee);

  update = async (id: number, employee: Partial<Employee>) =>
    // await this.employeeRepository.save({ id, ...employee });
    await this.employeeRepository.update({ id }, employee);

  remove = async (employee: Employee) =>
    await this.employeeRepository.softRemove(employee);
}

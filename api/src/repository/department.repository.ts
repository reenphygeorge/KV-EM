import { Repository } from "typeorm";
import Department from "../entity/department.entity";
import { UpdateDepartmentDto } from "../dto/department.dto";

export default class DepartmentRepository {
  constructor(private departmentRepository: Repository<Department>) {
    this.departmentRepository = departmentRepository;
  }

  find = async () =>
    await this.departmentRepository.find({
      relations: { employee: true },
    });

  findOneBy = async (filter: Partial<Department>) =>
    await this.departmentRepository.findOne({
      where: filter,
      relations: { employee: true },
    });

  save = async (department: Department) =>
    await this.departmentRepository.save(department);

  update = async (department: UpdateDepartmentDto) =>
    await this.departmentRepository.save(department);

  remove = async (department: Department) =>
    await this.departmentRepository.softRemove(department);
}

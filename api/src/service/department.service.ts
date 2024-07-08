import HttpException from "../exceptions/http.exception";
import DepartmentRepository from "../repository/department.repository";
import Department from "../entity/department.entity";
import { UpdateDepartmentDto } from "../dto/department.dto";

export class DepartmentService {
  constructor(private departmentRepository: DepartmentRepository) {}

  public getAllDepartments = async () => this.departmentRepository.find();

  public getDepartmentById = async (id: number) =>
    this.departmentRepository.findOneBy({ id });

  public getDepartmentByName = async (name: string) =>
    this.departmentRepository.findOneBy({ name });

  public createNewDepartment = async (name: string) => {
    const newDepartment = new Department();
    newDepartment.name = name;
    return await this.departmentRepository.save(newDepartment);
  };

  public updateDepartment = async (department: UpdateDepartmentDto) => {
    const departmentData = await this.getDepartmentById(department.id);
    if (!departmentData) {
      throw new HttpException(404, "Department Not Found");
    }
    return await this.departmentRepository.update(department);
  };

  public deleteDepartment = async (id: number) => {
    const departmentData = await this.getDepartmentById(id);
    if (!departmentData) {
      throw new HttpException(404, "Department Not Found");
    }
    if (departmentData.employee.length) {
      throw new HttpException(403, "Department has employees");
    }
    this.departmentRepository.remove(departmentData);
  };
}

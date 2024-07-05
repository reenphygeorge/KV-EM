import EmployeeRepository from "../../src/repository/employee.repository";
import Employee from "../../src/entity/employee.entity";
import EmployeeService from "../../src/service/employee.service";

describe("Employee Service", () => {
  let employeeRepository: EmployeeRepository;
  let employeeService: EmployeeService;

  beforeAll(() => {
    const dataSource = {
      getRepository: jest.fn(),
    };
    employeeRepository = new EmployeeRepository(
      dataSource.getRepository(Employee)
    ) as jest.Mocked<EmployeeRepository>;
    employeeService = new EmployeeService(employeeRepository);
  });
  it("should return allEmployees", async () => {
    const mock = jest.fn(employeeRepository.find).mockResolvedValue([]);
    employeeRepository.find = mock;
    const users = await employeeService.getAllEmployees();
    expect(users).toEqual([]);
    expect(mock).toHaveBeenCalledTimes(1);
  });
  //   it("should return Employee by id", async () => {
  //     const mock = jest
  //       .fn(employeeRepository.findOneBy)
  //       .mockResolvedValue({ id: 1 } as Employee);
  //     employeeRepository.findOneBy = mock;
  //     const users = await employeeService.getEmployeeById(1);
  //     expect(users.name).toEqual("");
  //     expect(mock).toHaveBeenCalledTimes(1);
  //   });
});

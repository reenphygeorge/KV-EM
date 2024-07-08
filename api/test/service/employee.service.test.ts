// import { when } from "jest-when";
// import EmployeeRepository from "../../src/repository/employee.repository";
// import DepartmentRepository from "../../src/repository/department.repository";
// import EmployeeService from "../../src/service/employee.service";
// import Employee from "../../src/entity/employee.entity";
// import Address from "../../src/entity/address.entity";
// import Department from "../../src/entity/department.entity";
// import { Role } from "../../src/utils/role.enum";

// describe("Employee Service", () => {
//   let employeeRepository: EmployeeRepository;
//   let departmentRepository: DepartmentRepository;
//   let employeeService: EmployeeService;
//   let dummyEmployees: Employee[];
//   let dummyAddresses: Address[];
//   let dummyDepartments: Department[];

//   beforeAll(() => {
//     const dataSource = {
//       getRepository: jest.fn(),
//     };
//     employeeRepository = new EmployeeRepository(
//       dataSource.getRepository(Employee)
//     ) as jest.Mocked<EmployeeRepository>;

//     departmentRepository = new DepartmentRepository(
//       dataSource.getRepository(Department)
//     ) as jest.Mocked<DepartmentRepository>;

//     employeeService = new EmployeeService(
//       employeeRepository,
//       departmentRepository
//     );

//     dummyAddresses = [
//       {
//         id: 1,
//         line1: "line1",
//         pincode: "123",
//         employee: null,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         deletedAt: null,
//       },
//       {
//         id: 2,
//         line1: "line2",
//         pincode: "456",
//         employee: null,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         deletedAt: null,
//       },
//     ];

//     dummyDepartments = [
//       {
//         id: 1,
//         name: "HR",
//         employee: [],
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         deletedAt: null,
//       },
//       {
//         id: 2,
//         name: "Engineering",
//         employee: [],
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         deletedAt: null,
//       },
//     ];

//     dummyEmployees = [
//       {
//         id: 1,
//         name: "test1",
//         email: "test1@gmail.com",
//         age: 20,
//         role: Role.HR,
//         password: "123",
//         address: dummyAddresses[0],
//         department: dummyDepartments[0],
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         deletedAt: null,
//       },
//       {
//         id: 2,
//         name: "test2",
//         email: "tes21@gmail.com",
//         age: 21,
//         role: Role.DEVELOPER,
//         password: "1234",
//         address: dummyAddresses[1],
//         department: dummyDepartments[1],
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         deletedAt: null,
//       },
//     ];
//   });

//   it("should return allEmployees", async () => {
//     const mock = jest
//       .fn(employeeRepository.find)
//       .mockResolvedValue(dummyEmployees);
//     employeeRepository.find = mock;

//     const users = await employeeService.getAllEmployees();
//     expect(users).toEqual(dummyEmployees);
//     expect(mock).toHaveBeenCalledTimes(1);
//   });

//   it("should return employee with id", async () => {
//     const mock = jest.fn();
//     when(mock)
//       .calledWith({ id: 1 }, ["address", "department"])
//       .mockResolvedValue(dummyEmployees[0])
//       .calledWith({ id: 2 }, ["address", "department"])
//       .mockResolvedValue(dummyEmployees[1]);
//     employeeRepository.findOneBy = mock;

//     const users = await employeeService.getEmployeeById(1);
//     expect(users.name).toEqual("test1");
//     expect(users.address.line1).toEqual("line1");
//     expect(mock).toHaveBeenCalledTimes(1);

//     const users2 = await employeeService.getEmployeeById(2);
//     expect(users2.name).toEqual("test2");
//     expect(users2.department.name).toEqual("Engineering");
//     expect(mock).toHaveBeenCalledTimes(2);
//   });

//   it("should create employee", async () => {
//     const mockSave = jest.fn(employeeRepository.save);
//     mockSave.mockResolvedValue(dummyEmployees[0]);
//     employeeRepository.save = mockSave;

//     const mockDepartment = jest.fn(departmentRepository.findOneBy);
//     when(mockDepartment)
//       .calledWith({ name: "HR" })
//       .mockResolvedValue(dummyDepartments[0]);
//     when(mockDepartment)
//       .calledWith({ name: "Engineering" })
//       .mockResolvedValue(dummyDepartments[1]);
//     departmentRepository.findOneBy = mockDepartment;

//     const user = await employeeService.createNewEmployee(
//       dummyEmployees[0].email,
//       dummyEmployees[0].name,
//       dummyEmployees[0].age,
//       dummyAddresses[0],
//       dummyEmployees[0].password,
//       dummyEmployees[0].role,
//       dummyDepartments[0]
//     );
//     expect(user).toEqual(dummyEmployees[0]);
//     expect(mockSave).toHaveBeenCalledTimes(1);
//   });
// });

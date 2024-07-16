import { departmentWithTag } from "../../../api/employeeApi";

export const DepartmentApi = departmentWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getDepartments: builder.query({
      query: () => "/department",
    }),
  }),
});

export const { useGetDepartmentsQuery } = DepartmentApi;

import { employeeWithTag } from "../../../api/employeeApi";

export const EmployeeApi = employeeWithTag.injectEndpoints({
  endpoints: (builder) => ({
    createEmployee: builder.mutation({
      query: (payload) => ({
        url: "/employee",
        method: "POST",
        body: payload,
      }),
    }),
    getAllEmployees: builder.query({
      query: () => ({
        url: "/employee",
        method: "GET",
      }),
      providesTags: ["EMPLOYEE_LIST"],
    }),
    getEmployeeById: builder.query({
      query: (id) => ({
        url: `/employee/${id}`,
        method: "GET",
      }),
      providesTags: ["EMPLOYEE_LIST"],
    }),
    editEmployee: builder.mutation({
      query: (payload) => ({
        url: "/employee",
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["EMPLOYEE_LIST"],
    }),
    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `/employee/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["EMPLOYEE_LIST"],
    }),
  }),
});

export const {
  useGetAllEmployeesQuery,
  useGetEmployeeByIdQuery,
  useCreateEmployeeMutation,
  useDeleteEmployeeMutation,
  useEditEmployeeMutation,
} = EmployeeApi;

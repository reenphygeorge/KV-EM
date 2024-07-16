import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const employeeBaseApi = createApi({
  reducerPath: "employeeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("kvLogin");
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: () => ({}),
});

const departmentBaseApi = createApi({
  reducerPath: "departmentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("kvLogin");
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: () => ({}),
});

const employeeWithTag = employeeBaseApi.enhanceEndpoints({
  addTagTypes: ["EMPLOYEE_LIST"],
});

const departmentWithTag = departmentBaseApi.enhanceEndpoints({
  addTagTypes: ["EMPLOYEE_LIST"],
});

export {
  employeeWithTag,
  employeeBaseApi,
  departmentWithTag,
  departmentBaseApi,
};

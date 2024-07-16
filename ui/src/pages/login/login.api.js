import { employeeWithTag } from "../../../api/employeeApi";

export const loginApi = employeeWithTag.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (payload) => ({
        url: "/employee/login",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useLoginMutation } = loginApi;

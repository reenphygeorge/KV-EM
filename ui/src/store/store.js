import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./employeeReducer";
import { departmentBaseApi, employeeBaseApi } from "../../api/employeeApi";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    employees: employeeReducer,
    [employeeBaseApi.reducerPath]: employeeBaseApi.reducer,
    [departmentBaseApi.reducerPath]: departmentBaseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(employeeBaseApi.middleware)
      .concat(departmentBaseApi.middleware),
});

setupListeners(store.dispatch);

export default store;

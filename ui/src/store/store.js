import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./employeeReducer";
import { employeeBaseApi } from "../../api/employeeApi";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    employees: employeeReducer,
    [employeeBaseApi.reducerPath]: employeeBaseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(employeeBaseApi.middleware),
});

setupListeners(store.dispatch);

export default store;

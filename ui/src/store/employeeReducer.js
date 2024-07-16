import { createAction, createReducer } from "@reduxjs/toolkit";
import { employeeDataFetched } from "./sampleData";

const addEmployee = createAction("ADD_EMPLOYEE");
const changeFilter = createAction("CHANGE_FILTER");
const editEmployee = createAction("EDIT_EMPLOYEE");
const deleteEmployee = createAction("DELETE_EMPLOYEE");

const employeeReducer = createReducer(
  {
    employees: employeeDataFetched,
    filterStatusBy: "All",
  },
  (builder) => {
    builder.addCase(addEmployee, (state, action) => {
      state.employees.push(action.payload);
    });
    builder.addCase(changeFilter, (state, action) => {
      state.filterStatusBy = action.payload;
    });
    builder.addCase(editEmployee, (state, action) => {
      const employeesAfterEdit = state.employees.map((employee) => {
        if (employee.id === action.payload.id) {
          return action.payload;
        }
        return employee;
      });
      state.employees.push(employeesAfterEdit);
    });
    builder.addCase(deleteEmployee, (state, action) => {
      const employeesAfterDelete = state.employees.filter(
        (employee) => employee.id !== action.payload
      );
      state.employees.push(employeesAfterDelete);
    });
  }
);

export {
  employeeReducer as default,
  addEmployee,
  editEmployee,
  deleteEmployee,
  changeFilter,
};

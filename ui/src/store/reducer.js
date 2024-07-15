const actionTypes = {
  ADD_EMPLOYEE: "ADD_EMPLOYEE",
  DELETE_EMPLOYEE: "DELETE_EMPLOYEE",
  EDIT_EMPLOYEE: "EDIT_EMPLOYEE",
  FILTER_EMPLOYEE: "FILTER_EMPLOYEE",
};

const employeeReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_EMPLOYEE:
      return {
        ...state,
        employees: [...state.employees, action.payload],
      };

    case actionTypes.DELETE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter(
          (employee) => employee.id !== action.payload
        ),
      };

    case actionTypes.EDIT_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.map((employee) => {
          if (employee.id === action.payload.id) {
            return action.payload;
          }
          return employee;
        }),
      };

    case actionTypes.FILTER_EMPLOYEE:
      return {
        ...state,
        filterStatusBy: action.payload === "Status" ? "All" : action.payload,
      };
    default:
      return state;
  }
};

export { actionTypes, employeeReducer };

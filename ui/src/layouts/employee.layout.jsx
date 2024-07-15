import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import { useEffect, useReducer } from "react";
import { employeeReducer } from "../store/reducer";
import { departmentDataFetched, userDataFetched } from "../store/store";

const EmployeeLayout = () => {
  const user = localStorage.getItem("kvLogin");
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(employeeReducer, {
    employees: userDataFetched,
    filterStatusBy: "All",
    departments: departmentDataFetched,
  });

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);
  return (
    <>
      <Sidebar />
      <Outlet context={{ state, dispatch }} />
    </>
  );
};

export default EmployeeLayout;

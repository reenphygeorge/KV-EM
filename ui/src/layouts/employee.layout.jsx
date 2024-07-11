import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import { useEffect } from "react";

const EmployeeLayout = () => {
  const user = localStorage.getItem("kvLogin");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/employee/create");
    else navigate("/");
  }, [user, navigate]);
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};

export default EmployeeLayout;

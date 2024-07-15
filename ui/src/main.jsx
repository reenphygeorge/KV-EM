import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./main.css";
import ReactDOM from "react-dom/client";
import Login from "./pages/login/login";
import CreateEmployee from "./pages/createEmployee/CreateEmployee";
import ErrorPage from "./pages/errorPage/errorPage";
import EmployeeDetails from "./pages/employeeDetails/employeeDetails";
import EmployeeLayout from "./layouts/employee.layout";
import SingleEmployee from "./pages/employeeDetails/singleEmployee";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/employee",
    element: <EmployeeLayout />,
    children: [
      {
        path: "create",
        element: <CreateEmployee />,
      },
      {
        path: "list",
        element: <EmployeeDetails />,
      },
      {
        path: "view/:id",
        element: <SingleEmployee />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login/login";
import ErrorPage from "./pages/errorPage/errorPage";
import EmployeeLayout from "./layouts/employee.layout";
import CreateEmployee from "./pages/createEmployee/CreateEmployee";
import EmployeeDetails from "./pages/employeeDetails/employeeDetails";
import SingleEmployee from "./pages/employeeDetails/singleEmployee";
import "./app.css";

const App = () => {
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

  return <RouterProvider router={router} />;
};

export default App;

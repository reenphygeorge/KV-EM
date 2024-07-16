import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import Login from "./pages/login/login";
import ErrorPage from "./pages/errorPage/errorPage";
import EmployeeLayout from "./layouts/employee.layout";
import CreateEmployee from "./pages/employeeDetails/CreateEmployee";
import EmployeeDetails from "./pages/employeeDetails/employeeDetails";
import SingleEmployee from "./pages/employeeDetails/singleEmployee";
import "./app.css";
import store from "./store/store";

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

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;

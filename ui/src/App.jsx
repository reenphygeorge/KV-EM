import { useState } from "react";
import CreateEmployee from "./pages/createEmployee/CreateEmployee.jsx";
import Login from "./pages/login/login.jsx";

const App = () => {
  const [login, setLogin] = useState(false);
  return login ? (
    <CreateEmployee />
  ) : (
    <Login login={login} setLogin={() => setLogin} />
  );
};

export default App;

import { v4 as uuidv4 } from "uuid";
import "./createEmployee.style.css";
import UserForm from "../../components/formElements/userForm";
import { actionTypes } from "../../store/reducer";
import { useNavigate, useOutletContext } from "react-router-dom";

const CreateEmployee = () => {
  const { dispatch } = useOutletContext();
  const employeeData = {
    id: "",
    name: "",
    joinDate: new Date(Date.now()).toISOString().slice(0, 10),
    role: "",
    status: "",
    department: "",
    experience: "",
    flatOrPhoneNo: "",
    addressLine1: "",
    addressLine2: "",
  };

  const navigate = useNavigate();

  const createEmployee = (data) => {
    navigate("/employee/list");
    dispatch({
      type: actionTypes.ADD_EMPLOYEE,
      payload: { ...data, id: uuidv4() },
    });
  };
  return (
    <main className="create-main">
      <section className="create-section">
        <div className="create-wrap">
          <h1>Create Employee</h1>
        </div>
        <div className="form-wrap">
          <UserForm data={employeeData} submitHandler={createEmployee} />
        </div>
      </section>
    </main>
  );
};

export default CreateEmployee;

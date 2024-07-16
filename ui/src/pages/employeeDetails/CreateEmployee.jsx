import { v4 as uuidv4 } from "uuid";
import "./createEmployee.style.css";
import UserForm from "../../components/formElements/userForm";
import { useNavigate } from "react-router-dom";
import { useCreateEmployeeMutation } from "./employee.api";
import { useEffect } from "react";

const CreateEmployee = () => {
  const employeeData = {
    id: "",
    name: "",
    joinDate: new Date(Date.now()).toISOString(),
    role: "",
    status: "",
    department: "",
    experience: 0,
    flatOrPhoneNo: "",
    addressLine1: "",
    addressLine2: "",
  };

  const navigate = useNavigate();
  const [createEmployee, { isSuccess, data, isError }] =
    useCreateEmployeeMutation();

  const createEmployeeHandler = (data) => {
    createEmployee({
      name: data.name,
      email: `${uuidv4()}@keyvalue.system`,
      password: "1234",
      role: data.role,
      status: data.status,
      experience: Number(data.experience),
      joinDate: new Date(data.joinDate).toISOString(),
      address: {
        line1: data.addressLine1,
        line2: data.addressLine2,
        flatOrPhoneNo: data.flatOrPhoneNo,
      },
      department: {
        name: data.department,
      },
    });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/employee/list");
    } else if (isError) {
      console.log("Error");
    }
  }, [isSuccess, isError, data, navigate]);

  return (
    <main className="create-main">
      <section className="create-section">
        <div className="create-wrap">
          <h1>Create Employee</h1>
        </div>
        <div className="form-wrap">
          <UserForm data={employeeData} submitHandler={createEmployeeHandler} />
        </div>
      </section>
    </main>
  );
};

export default CreateEmployee;

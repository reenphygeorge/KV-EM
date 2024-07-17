import "./createEmployee.style.css";
import UserForm from "../../components/formElements/userForm";
import { useNavigate } from "react-router-dom";
import { useCreateEmployeeMutation } from "./employee.api";
import { useEffect, useState } from "react";
import Toast from "../../components/toast/toast";

const CreateEmployee = () => {
  const employeeData = {
    id: "",
    name: "",
    email: "",
    password: "",
    joinDate: new Date(Date.now()).toISOString(),
    role: "Probation",
    status: "Active",
    department: "HR",
    experience: 0,
    flatOrPhoneNo: "",
    addressLine1: "",
    addressLine2: "",
  };

  const navigate = useNavigate();
  const [createEmployee, { isSuccess, data, isError, error }] =
    useCreateEmployeeMutation();

  const createEmployeeHandler = (data) => {
    if (!data.joinDate) {
      setTimeout(() => {
        setToast({ status: false });
      }, 2000);
      setToast({ status: true, message: "Date must not be empty" });
    }
    createEmployee({
      name: data.name,
      email: data.email,
      password: data.password,
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

  const [toast, setToast] = useState({ status: false, message: "" });

  useEffect(() => {
    if (isSuccess) {
      navigate("/employee/list");
    } else if (isError) {
      let errorMessage = "Something went wrong!";
      if (error.data.error === "Validation Error") {
        errorMessage = error.data.errors[0];
      }
      setTimeout(() => {
        setToast({ status: false });
      }, 2000);
      setToast({ status: true, message: errorMessage });
    }
  }, [isSuccess, isError, error, data, navigate]);

  return (
    <main className="create-main">
      <Toast showToast={toast.status} message={toast.message} status="fail" />
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

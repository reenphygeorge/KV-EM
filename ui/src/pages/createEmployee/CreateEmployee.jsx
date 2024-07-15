import "./createEmployee.style.css";
import UserForm from "../../components/formElements/userForm";

const CreateEmployee = () => {
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

  const createEmployee = () => {
    console.log("Employee Created!");
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

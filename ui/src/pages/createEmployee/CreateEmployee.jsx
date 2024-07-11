import { useState } from "react";
import Button from "../../components/button/Button";
import SelectField from "../../components/formElements/SelectField";
import TextField from "../../components/formElements/TextField";
import "./createEmployee.style.css";

const CreateEmployee = () => {
  const [employeeData, setEmployeeData] = useState({
    id: "",
    name: "",
    joinDate: new Date(Date.now()).toISOString().slice(0, 10),
    role: "",
    status: "",
    experience: "",
    address: "",
  });

  const handleChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.id]: e.target.value });
  };

  const fieldData = [
    {
      label: "Employee ID",
      id: "id",
      type: "text",
      select: false,
      text: employeeData.id,
    },
    {
      label: "Employee Name",
      id: "name",
      type: "text",
      select: false,
      text: employeeData.name,
    },
    {
      label: "Joining Date",
      id: "joinDate",
      type: "date",
      select: false,
      text: employeeData.joinDate,
    },
    {
      label: "Role",
      id: "role",
      select: true,
      options: ["Probation", "Associate", "Senior"],
      text: employeeData.role,
    },
    {
      label: "Status",
      id: "status",
      select: true,
      options: ["Joined", "On Leave"],
      text: employeeData.status,
    },
    {
      label: "Experience",
      id: "experience",
      type: "text",
      select: false,
      text: employeeData.experience,
    },
    {
      label: "Address",
      id: "address",
      type: "text",
      select: false,
      text: employeeData.address,
    },
  ];

  const displayData = (e) => {
    e.preventDefault();
    console.log(employeeData);
  };

  return (
    <main className="create-main">
      <section className="create-section">
        <div className="create-wrap">
          <h1>Create Employee</h1>
        </div>
        <form className="form-wrap" onSubmit={displayData}>
          <div className="form-flex">
            {fieldData.map((data) =>
              data.select ? (
                <SelectField
                  key={data.label}
                  id={data.id}
                  label={data.label}
                  options={data.options}
                  handleChange={handleChange}
                />
              ) : (
                <TextField
                  key={data.label}
                  label={data.label}
                  type={data.type}
                  id={data.id}
                  handleChange={handleChange}
                  text={employeeData[data.id]}
                />
              )
            )}
          </div>
          <div className="button-wrap">
            <Button innerText="Create" />
            <Button innerText="Cancel" type="reset" style="outline" />
          </div>
        </form>
      </section>
    </main>
  );
};

export default CreateEmployee;

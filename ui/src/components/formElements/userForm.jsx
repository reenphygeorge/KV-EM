import { useEffect, useState } from "react";
import Button from "../button/Button";
import SelectField from "./SelectField";
import TextField from "./TextField";
import "./userForm.css";
import { useGetDepartmentsQuery } from "../../pages/employeeDetails/department.api";

const UserForm = ({
  data,
  submitHandler,
  cancelHandler = () => null,
  editMode = false,
}) => {
  const [departments, setDepartments] = useState([]);
  const [employeeData, setEmployeeData] = useState(data);
  const departmentsQuery = useGetDepartmentsQuery();

  useEffect(() => {
    if (departmentsQuery.isSuccess) {
      const departmentFetched = departmentsQuery.data.map((department) => {
        return department.name;
      });
      setDepartments(departmentFetched);
    }
  }, [departmentsQuery.isSuccess, departmentsQuery.data]);

  const handleChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.id]: e.target.value });
  };

  const fieldData = [
    {
      label: "Employee ID",
      id: "id",
      type: "text",
      select: false,
      value: employeeData.id,
      disabled: true,
      required: true,
    },
    {
      label: "Employee Name",
      id: "name",
      type: "text",
      select: false,
      value: employeeData.name,
      required: true,
    },
    {
      label: "Joining Date",
      id: "joinDate",
      type: "date",
      select: false,
      value: employeeData.joinDate,
      required: true,
    },
    {
      label: "Role",
      id: "role",
      select: true,
      options: ["Probation", "Associate", "Senior"],
      value: employeeData.role,
      required: true,
    },
    {
      label: "Status",
      id: "status",
      select: true,
      options: ["Active", "Inactive", "Probation"],
      value: employeeData.status,
      required: true,
    },
    {
      label: "Department",
      id: "department",
      select: true,
      options: departments,
      value: employeeData.department,
      required: true,
    },
    {
      label: "Experience",
      id: "experience",
      type: "number",
      select: false,
      value: employeeData.experience,
      required: true,
    },
    {
      label: "Flat No / Phone No",
      id: "flatOrPhoneNo",
      type: "text",
      select: false,
      value: employeeData.flatOrPhoneNo,
      required: true,
    },
    {
      label: "Address Line 1",
      id: "addressLine1",
      type: "text",
      select: false,
      value: employeeData.addressLine1,
      required: true,
    },
    {
      label: "Address Line 2",
      id: "addressLine2",
      type: "text",
      select: false,
      value: employeeData.addressLine2,
      required: true,
    },
  ];

  const filteredFieldData = editMode
    ? fieldData
    : fieldData.filter((data) => data.id !== "id");

  const displayData = (e) => {
    e.preventDefault();
  };
  return (
    <form className="form" onSubmit={displayData}>
      <div className="form-flex">
        {filteredFieldData.map((data) =>
          data.select ? (
            <SelectField
              key={data.label}
              id={data.id}
              label={data.label}
              options={data.options}
              handleChange={handleChange}
              value={data.value}
            />
          ) : (
            <TextField
              key={data.label}
              label={data.label}
              type={data.type}
              id={data.id}
              handleChange={handleChange}
              value={data.value}
              disabled={data.disabled}
            />
          )
        )}
      </div>
      <div className="button-wrap">
        <Button
          innerText={editMode ? "Edit" : "Create"}
          onClick={() => submitHandler(employeeData)}
        />
        <Button
          innerText="Cancel"
          type="reset"
          style="outline"
          onClick={cancelHandler}
        />
      </div>
    </form>
  );
};

export default UserForm;

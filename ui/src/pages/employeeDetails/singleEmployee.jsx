import { useParams } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import "./singleEmployee.style.css";
import Modal from "../../components/modal/Modal";
import UserForm from "../../components/formElements/userForm";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editEmployee } from "../../store/employeeReducer";
import { useGetEmployeeByIdQuery } from "./employee.api";

const SingleEmployee = () => {
  const { id } = useParams();

  const { data = {}, isError, isSuccess } = useGetEmployeeByIdQuery(id);
  const [employeeData, setEmployeeData] = useState({
    id: "",
    name: "",
    joinDate: "",
    role: "",
    status: "",
    experience: 0,
    addressLine1: "",
    addressLine2: "",
    flatOrPhoneNo: "",
    department: "",
  });

  useEffect(() => {
    if (isSuccess) {
      setEmployeeData({
        id: data.id,
        name: data.name,
        joinDate: data.joinDate.split("T")[0],
        role: data.role,
        status: data.status,
        experience: data.experience,
        addressLine1: data.address.line1,
        addressLine2: data.address.line2,
        flatOrPhoneNo: data.address.flatOrPhoneNo,
        department: data.department.name,
      });
    }
    if (isError) {
      console.log("Error");
    }
  }, [data, isSuccess, isError]);
  const dispatch = useDispatch();
  // const employees = useSelector((state) => state.employees.employees);
  const [editMode, setEditMode] = useState(false);
  const cancelEdit = () => {
    setEditMode(false);
  };

  const saveEdit = (data) => {
    dispatch(editEmployee(data));
    setEditMode(false);
  };
  return (
    <>
      {editMode ? (
        <Modal
          child={
            <UserForm
              data={employeeData}
              editMode={editMode !== null ? true : false}
              cancelHandler={cancelEdit}
              submitHandler={saveEdit}
            />
          }
        />
      ) : (
        ""
      )}
      <main className={`details-main ${editMode ? "opacity" : ""}`}>
        <section className="details-section">
          <div className="details-wrap">
            <h1>Employee Details</h1>
            <div className="menu-wrapper">
              <div className="edit-wrapper" onClick={() => setEditMode(true)}>
                <button className="edit-button">
                  <FaPen size="25px" />
                </button>
                <h4>Edit</h4>
              </div>
            </div>
          </div>
          <div className="details-wrap employee-detail grid-container">
            <div>
              <h6>Employee Name</h6>
              <p>{employeeData.name}</p>
            </div>
            <div>
              <h6>Joining Date</h6>
              <p>{employeeData.joinDate}</p>
            </div>
            <div>
              <h6>Experience</h6>
              <p>{employeeData.experience} years</p>
            </div>
            <div>
              <h6>Role</h6>
              <p>{employeeData.role}</p>
            </div>
            <div>
              <h6>Status</h6>
              <div
                className={`${employeeData.status.toLowerCase()} status-pill`}
              >
                <p>{employeeData.status}</p>
              </div>
            </div>
            <div>
              <h6>Department</h6>
              <p>{employeeData.department}</p>
            </div>
            <div>
              <h6>Address</h6>
              <p>
                {employeeData.addressLine1} {employeeData.addressLine2}
              </p>
            </div>
            <div>
              <h6>Employee ID</h6>
              <p>{employeeData.id}</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default SingleEmployee;

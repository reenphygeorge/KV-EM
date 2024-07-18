import { useParams } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import "./singleEmployee.style.css";
import Modal from "../../components/modal/Modal";
import UserForm from "../../components/formElements/userForm";
import { useEffect, useState } from "react";
import {
  useEditEmployeeMutation,
  useGetEmployeeByIdQuery,
} from "./employee.api";
import Toast from "../../components/toast/toast";

const SingleEmployee = () => {
  const { id } = useParams();

  const { data = {}, isError, isSuccess } = useGetEmployeeByIdQuery(id);
  const [employeeData, setEmployeeData] = useState({
    id,
    name: "",
    email: "",
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
        email: data.email,
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
  const [editId, setEditId] = useState(null);

  const cancelEdit = () => {
    setEditId(null);
  };

  const [editEmployee, editProperties] = useEditEmployeeMutation();
  const [toast, setToast] = useState({ status: false, message: "" });

  const saveEdit = (editData) => {
    if (!editData.joinDate) {
      setTimeout(() => {
        setToast({ status: false });
      }, 2000);
      setToast({ status: true, message: "Date must not be empty" });
    }
    editEmployee({
      id: Number(editId),
      name: editData.name,
      email: editData.email,
      role: editData.role,
      status: editData.status,
      experience: Number(editData.experience),
      joinDate: new Date(editData.joinDate).toISOString(),
      address: {
        line1: editData.addressLine1,
        line2: editData.addressLine2,
        flatOrPhoneNo: editData.flatOrPhoneNo,
      },
      department: {
        name: editData.department,
      },
    });
  };

  useEffect(() => {
    if (editProperties.isSuccess) {
      setEditId(null);
    } else if (editProperties.isError) {
      let errorMessage = "Something went wrong!";
      if (editProperties.error.data.error === "Validation Error") {
        errorMessage = editProperties.error.data.errors[0];
      }
      setTimeout(() => {
        setToast({ status: false });
      }, 2000);
      setToast({ status: true, message: errorMessage });
    }
  }, [editProperties.isSuccess, editProperties.isError, editProperties.error]);
  return (
    <>
      {editId !== null ? (
        <Modal
          child={
            <UserForm
              data={employeeData}
              editMode={editId !== null}
              cancelHandler={cancelEdit}
              submitHandler={saveEdit}
            />
          }
        />
      ) : (
        ""
      )}
      <Toast showToast={toast.status} message={toast.message} status="fail" />
      <main className={`details-main ${editId !== null ? "opacity" : ""}`}>
        <section className="details-section">
          <div className="details-wrap">
            <h1>Employee Details</h1>
            <div className="menu-wrapper">
              <div className="edit-wrapper">
                <button
                  className="edit-button"
                  onClick={() => {
                    setEditId(id);
                  }}
                >
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
              <h6>Employee Email</h6>
              <p>{employeeData.email}</p>
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

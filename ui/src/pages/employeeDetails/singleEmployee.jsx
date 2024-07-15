import { useOutletContext, useParams } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import "./singleEmployee.style.css";
import Modal from "../../components/modal/Modal";
import UserForm from "../../components/formElements/userForm";
import { useState } from "react";
import { actionTypes } from "../../store/reducer";

const SingleEmployee = () => {
  const { id } = useParams();
  const { state, dispatch } = useOutletContext();

  const currentUserData = state.employees.find(
    (employee) => employee.id === id
  );
  const [editMode, setEditMode] = useState(false);
  const cancelEdit = () => {
    setEditMode(false);
  };

  const saveEdit = (data) => {
    dispatch({ type: actionTypes.EDIT_EMPLOYEE, payload: data });
    setEditMode(false);
  };
  return (
    <>
      {editMode ? (
        <Modal
          child={
            <UserForm
              data={currentUserData}
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
              <p>{currentUserData.name}</p>
            </div>
            <div>
              <h6>Joining Date</h6>
              <p>{currentUserData.joinDate}</p>
            </div>
            <div>
              <h6>Experience</h6>
              <p>{currentUserData.experience}</p>
            </div>
            <div>
              <h6>Role</h6>
              <p>{currentUserData.role}</p>
            </div>
            <div>
              <h6>Status</h6>
              <div
                className={`${currentUserData.status.toLowerCase()} status-pill`}
              >
                <p>{currentUserData.status}</p>
              </div>
            </div>
            <div>
              <h6>Department</h6>
              <p>{currentUserData.department}</p>
            </div>
            <div>
              <h6>Address</h6>
              <p>
                {currentUserData.addressLine1} {currentUserData.addressLine2}
              </p>
            </div>
            <div>
              <h6>Employee ID</h6>
              <p>{currentUserData.id}</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default SingleEmployee;

import { MdOutlineDelete, MdModeEditOutline } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import "./employeeDetails.style.css";
import RoundedSelect from "../../components/formElements/RoundedSelect";
import { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import Modal from "../../components/modal/Modal";
import UserForm from "../../components/formElements/userForm";
import DeleteEmployee from "./deleteEmployeeConfirmation";
import { actionTypes } from "../../store/reducer";

const EmployeeDetails = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useOutletContext();

  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const filteredData =
    state.filterStatusBy !== "All"
      ? state.employees.filter(
          (employee) => employee.status === state.filterStatusBy
        )
      : state.employees;

  const editMode = (id) => {
    setEditId(id);
  };

  const cancelEdit = () => {
    setEditId(null);
  };

  const saveEdit = (data) => {
    dispatch({ type: actionTypes.EDIT_EMPLOYEE, payload: data });
    setEditId(null);
  };

  const deleteEmployee = () => {
    dispatch({ type: actionTypes.DELETE_EMPLOYEE, payload: deleteId });
    console.log(`Deleted ${deleteId}`);
    setDeleteId(null);
  };

  const filter = (e) => {
    dispatch({ type: actionTypes.FILTER_EMPLOYEE, payload: e.target.value });
  };

  const cancelDelete = () => {
    setDeleteId(null);
  };

  return (
    <>
      {editId !== null ? (
        <Modal
          child={
            <UserForm
              data={state.employees.find((employee) => employee.id === editId)}
              editMode={editId !== null ? true : false}
              cancelHandler={cancelEdit}
              submitHandler={saveEdit}
            />
          }
        />
      ) : (
        ""
      )}
      {deleteId !== null ? (
        <Modal
          child={
            <DeleteEmployee
              deleteHandler={deleteEmployee}
              cancelHandler={cancelDelete}
            />
          }
          size="sm"
        />
      ) : (
        ""
      )}
      <main
        className={`details-main ${
          editId !== null || deleteId !== null ? "opacity" : ""
        }`}
      >
        <section className="details-section">
          <div className="details-wrap">
            <h1>Employee List</h1>
            <div className="menu-wrapper">
              <div className="filter-wrapper">
                <h4>Filter By</h4>
                <RoundedSelect
                  options={["Status", "Active", "Inactive", "Probation"]}
                  handleChange={filter}
                />
              </div>
              <div className="create-wrapper">
                <Link to="/employee/create" className="create-button">
                  <GoPlus size="25px" />
                </Link>
                <h4>Create Employee</h4>
              </div>
            </div>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Employee ID</th>
                  <th>Joining Date</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Experience</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map(
                  ({ name, id, joinDate, role, status, experience }) => (
                    <tr
                      key={id}
                      onClick={() => navigate(`/employee/view/${id}`)}
                    >
                      <td>{name}</td>
                      <td>{id}</td>
                      <td>{joinDate}</td>
                      <td>{role}</td>
                      <td>
                        <div className={`${status.toLowerCase()} status-pill`}>
                          <p>{status}</p>
                        </div>
                      </td>
                      <td>{experience}</td>
                      <td className="action-td">
                        <MdOutlineDelete
                          size="25px"
                          color="#e76a6ad9"
                          className="delete-icon"
                          style={{ cursor: "pointer" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteId(id);
                          }}
                        />
                        <MdModeEditOutline
                          size="25px"
                          color="#6ab7e7d9"
                          className="edit-icon"
                          style={{ cursor: "pointer" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            editMode(id);
                          }}
                        />
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
};

export default EmployeeDetails;

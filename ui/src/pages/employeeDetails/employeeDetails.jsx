import { MdOutlineDelete, MdModeEditOutline } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import "./employeeDetails.style.css";
import RoundedSelect from "../../components/formElements/RoundedSelect";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../../components/modal/Modal";
import UserForm from "../../components/formElements/userForm";
import DeleteEmployee from "./deleteEmployeeConfirmation";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../store/employeeReducer";
import {
  useDeleteEmployeeMutation,
  useEditEmployeeMutation,
  useGetAllEmployeesQuery,
} from "./employee.api";

const EmployeeDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data = [] } = useGetAllEmployeesQuery();

  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    if (data.length !== 0) {
      const fetchedEmployeeData = data.map((data) => {
        return {
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
        };
      });
      setEmployeeData(fetchedEmployeeData);
    }
  }, [data]);

  const filterStatusBy = useSelector((state) => state.employees.filterStatusBy);

  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const filteredData =
    filterStatusBy !== "All"
      ? employeeData.filter((employee) => employee.status === filterStatusBy)
      : employeeData;

  const [deleteEmployee, deleteProperties] = useDeleteEmployeeMutation();

  const [editEmployee, editProperties] = useEditEmployeeMutation();

  const editMode = (id) => {
    setEditId(id);
  };

  const cancelEdit = () => {
    setEditId(null);
  };

  const saveEdit = (editData) => {
    editEmployee({
      id: editId,
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

  const deleteEmployeeHandler = () => {
    deleteEmployee(deleteId);
  };

  const filter = (e) => {
    e.target.value === "Status"
      ? dispatch(changeFilter("All"))
      : dispatch(changeFilter(e.target.value));
  };

  const cancelDelete = () => {
    setDeleteId(null);
  };

  useEffect(() => {
    if (editProperties.isSuccess) {
      setEditId(null);
    } else if (editProperties.isError) {
      console.log("Error");
      setEditId(null);
    }
  }, [editProperties.isSuccess, editProperties.isError]);

  useEffect(() => {
    if (deleteProperties.isSuccess) {
      setDeleteId(null);
    } else if (deleteProperties.isError) {
      console.log("Error");
      setDeleteId(null);
    }
  }, [deleteProperties.isSuccess, deleteProperties.isError]);

  return (
    <>
      {editId !== null ? (
        <Modal
          child={
            <UserForm
              data={employeeData.find((employee) => employee.id === editId)}
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
              deleteHandler={deleteEmployeeHandler}
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
                      <td>{experience} years</td>
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

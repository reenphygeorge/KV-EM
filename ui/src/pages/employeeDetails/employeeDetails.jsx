import { MdOutlineDelete, MdModeEditOutline } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import "./employeeDetails.style.css";
import RoundedSelect from "../../components/formElements/RoundedSelect";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../../components/modal/Modal";
import UserForm from "../../components/formElements/userForm";
import DeleteEmployee from "./deleteEmployeeConfirmation";

const EmployeeDetails = () => {
  const navigate = useNavigate();
  const userDataFetched = [
    {
      id: "001",
      name: "John Doe",
      joinDate: "2024-07-12",
      role: "Backend",
      status: "Active",
      department: "Development",
      experience: "4 years",
      flatOrPhoneNo: "123-456-7890",
      addressLine1: "123 Main St",
      addressLine2: "Apt 101",
    },
    {
      id: "002",
      name: "Jane Smith",
      joinDate: "2024-07-12",
      role: "Product Manager",
      status: "Inactive",
      department: "HR",
      experience: "5 years",
      flatOrPhoneNo: "234-567-8901",
      addressLine1: "456 Elm St",
      addressLine2: "Suite 202",
    },
    {
      id: "003",
      name: "Alice Johnson",
      joinDate: "2024-07-12",
      role: "UI/UX",
      status: "Active",
      department: "Design",
      experience: "3 years",
      flatOrPhoneNo: "345-678-9012",
      addressLine1: "789 Oak St",
      addressLine2: "Unit 303",
    },
    {
      id: "004",
      name: "Bob Williams",
      joinDate: "2024-07-12",
      role: "HR",
      status: "Probation",
      department: "HR",
      experience: "6 months",
      flatOrPhoneNo: "456-789-0123",
      addressLine1: "987 Pine St",
      addressLine2: "Floor 4",
    },
    {
      id: "005",
      name: "Eve Brown",
      joinDate: "2024-07-12",
      role: "Frontend",
      status: "Inactive",
      department: "Development",
      experience: "2 years",
      flatOrPhoneNo: "567-890-1234",
      addressLine1: "654 Cedar St",
      addressLine2: "Suite 505",
    },
    {
      id: "006",
      name: "Michael Lee",
      joinDate: "2024-07-12",
      role: "Backend",
      status: "Active",
      department: "Development",
      experience: "7 years",
      flatOrPhoneNo: "678-901-2345",
      addressLine1: "321 Maple St",
      addressLine2: "Apt 404",
    },
    {
      id: "007",
      name: "Sophia Clark",
      joinDate: "2024-07-12",
      role: "Product Manager",
      status: "Active",
      department: "HR",
      experience: "3 years",
      flatOrPhoneNo: "789-012-3456",
      addressLine1: "123 Oak St",
      addressLine2: "Suite 606",
    },
    {
      id: "008",
      name: "David Taylor",
      joinDate: "2024-07-12",
      role: "UI/UX",
      status: "Inactive",
      department: "Design",
      experience: "1 year",
      flatOrPhoneNo: "890-123-4567",
      addressLine1: "456 Walnut St",
      addressLine2: "Unit 707",
    },
    {
      id: "009",
      name: "Olivia Anderson",
      joinDate: "2024-07-12",
      role: "Backend",
      status: "Active",
      department: "Development",
      experience: "4 years",
      flatOrPhoneNo: "901-234-5678",
      addressLine1: "789 Pine St",
      addressLine2: "Floor 808",
    },
    {
      id: "010",
      name: "Liam Wilson",
      joinDate: "2024-07-12",
      role: "Frontend",
      status: "Active",
      department: "Development",
      experience: "2 years",
      flatOrPhoneNo: "012-345-6789",
      addressLine1: "654 Oak St",
      addressLine2: "Suite 909",
    },
  ];

  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [userData] = useState(userDataFetched);
  const [userDataFiltered, setUserDataFiltered] = useState(userData);

  const filter = (e) => {
    const filterValue = e.target.value;
    if (filterValue === "Status") setUserDataFiltered(userData);
    else
      setUserDataFiltered(
        userData.filter((data) => data.status === filterValue)
      );
  };

  const edit = (id) => {
    setEditId(id);
  };

  const cancelEdit = () => {
    setEditId(null);
  };

  const saveEdit = () => {
    console.log("Data Edited");
  };

  const deleteEmployee = (id) => {
    setDeleteId(null);
    console.log(`Deleted ${id}`);
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
              data={userDataFetched[editId]}
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
                {userDataFiltered.map(
                  ({ name, id, joinDate, role, status, experience }, index) => (
                    <tr
                      key={id}
                      onClick={() => navigate(`/employee/view/${index}`)}
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
                            edit(index);
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

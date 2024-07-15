import { useParams } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import "./singleEmployee.style.css";
import Modal from "../../components/modal/Modal";
import UserForm from "../../components/formElements/userForm";
import { useState } from "react";

const SingleEmployee = () => {
  const { id } = useParams();
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
  const [editMode, setEditMode] = useState(false);
  const cancelEdit = () => {
    setEditMode(false);
  };

  const saveEdit = () => {
    console.log("Data Edited");
  };
  return (
    <>
      {editMode ? (
        <Modal
          child={
            <UserForm
              data={userDataFetched[id]}
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
              <p>{userDataFetched[id].name}</p>
            </div>
            <div>
              <h6>Joining Date</h6>
              <p>{userDataFetched[id].joinDate}</p>
            </div>
            <div>
              <h6>Experience</h6>
              <p>{userDataFetched[id].experience}</p>
            </div>
            <div>
              <h6>Role</h6>
              <p>{userDataFetched[id].role}</p>
            </div>
            <div>
              <h6>Status</h6>
              <div
                className={`${userDataFetched[
                  id
                ].status.toLowerCase()} status-pill`}
              >
                <p>{userDataFetched[id].status}</p>
              </div>
            </div>
            <div>
              <h6>Department</h6>
              <p>{userDataFetched[id].department}</p>
            </div>
            <div>
              <h6>Address</h6>
              <p>
                {userDataFetched[id].addressLine1}{" "}
                {userDataFetched[id].addressLine2}
              </p>
            </div>
            <div className="">
              <h6>Employee ID</h6>
              <p>{userDataFetched[id].id}</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default SingleEmployee;

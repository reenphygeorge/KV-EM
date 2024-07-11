import { MdOutlineDelete, MdModeEditOutline } from "react-icons/md";
import "./employeeDetails.style.css";
import SelectField from "../../components/formElements/SelectField";

const EmployeeDetails = () => {
  const userData = [
    {
      name: "John Doe",
      id: "001",
      joinDate: "2020-01-15",
      role: "Software Engineer",
      status: "Active",
      experience: "4 years",
    },
    {
      name: "Jane Smith",
      id: "002",
      joinDate: "2019-07-20",
      role: "Product Manager",
      status: "Inactive",
      experience: "5 years",
    },
    {
      name: "Alice Johnson",
      id: "003",
      joinDate: "2020-03-10",
      role: "Data Analyst",
      status: "Active",
      experience: "3 years",
    },
    {
      name: "Bob Williams",
      id: "004",
      joinDate: "2018-11-05",
      role: "Sales Manager",
      status: "Probation",
      experience: "6 months",
    },
    {
      name: "Eve Brown",
      id: "005",
      joinDate: "2021-02-28",
      role: "HR Specialist",
      status: "Inactive",
      experience: "2 years",
    },
    {
      name: "Michael Lee",
      id: "006",
      joinDate: "2017-09-15",
      role: "Software Developer",
      status: "Active",
      experience: "7 years",
    },
    {
      name: "Sophia Clark",
      id: "007",
      joinDate: "2019-05-12",
      role: "Marketing Manager",
      status: "Active",
      experience: "3 years",
    },
    {
      name: "David Taylor",
      id: "008",
      joinDate: "2020-08-20",
      role: "Financial Analyst",
      status: "Inactive",
      experience: "1 year",
    },
    {
      name: "Olivia Anderson",
      id: "009",
      joinDate: "2018-04-25",
      role: "Operations Coordinator",
      status: "Active",
      experience: "4 years",
    },
    {
      name: "Liam Wilson",
      id: "010",
      joinDate: "2019-11-30",
      role: "Customer Support Specialist",
      status: "Active",
      experience: "2 years",
    },
  ];

  return (
    <main className="details-main">
      <section className="details-section">
        <div className="details-wrap">
          <h1>Employee List</h1>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h3>Filter</h3>
            <SelectField options={["Status", "Role"]} />
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
              {userData.map(
                ({ name, id, joinDate, role, status, experience }) => (
                  <tr key={id}>
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
                    <td>
                      <MdOutlineDelete
                        size="25px"
                        color="#e76a6ad9"
                        className="delete-icon"
                        style={{ cursor: "pointer" }}
                        onClick={() => console.log(`Deleted ${id}`)}
                      />
                      <MdModeEditOutline
                        size="25px"
                        color="#6ab7e7d9"
                        style={{ cursor: "pointer" }}
                        onClick={() => console.log(`Edit ${id}`)}
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
  );
};

export default EmployeeDetails;

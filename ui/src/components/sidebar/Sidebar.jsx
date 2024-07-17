import "./sidebar.style.css";
import kvLogo from "../../assets/kv-logo.png";
import personIcon from "../../assets/icon.svg";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const sidebarItems = [
    {
      title: "Create Employee",
      link: "create",
    },
    {
      title: "List Employee",
      link: "list",
    },
    {
      title: "Signout",
      link: "/",
    },
  ];

  const navigate = useNavigate();
  const signout = () => {
    localStorage.removeItem("kvLogin");
    navigate("/");
  };
  return (
    <aside>
      <nav>
        <Link to="/employee/list">
          <div className="nav-logo-wrap">
            <img src={kvLogo} alt="key value logo" className="kv-logo" />
          </div>
        </Link>
      </nav>
      {sidebarItems.map(({ link, title }) => (
        <div
          className={`list-wrap ${title === "Signout" ? "signout-link " : ""}`}
          key={title}
        >
          <div className="img-wrap">
            <img src={personIcon} alt="" />
          </div>
          <Link
            className="list-wrap-link"
            to={link}
            onClick={title === "Signout" ? signout : ""}
          >
            {title}
          </Link>
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;

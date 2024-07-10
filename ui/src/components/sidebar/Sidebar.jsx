import "./sidebar.style.css";
import kvLogo from "../../assets/kv-logo.png";
import personIcon from "../../assets/icon.svg";

const Sidebar = () => (
  <aside>
    <nav>
      <div className="nav-logo-wrap">
        <img src={kvLogo} alt="key value logo" className="kv-logo" />
      </div>
    </nav>
    <div className="list-wrap">
      <div className="img-wrap">
        <img src={personIcon} alt="" />
      </div>
      <a href="#">Employee list</a>
    </div>
  </aside>
);

export default Sidebar;

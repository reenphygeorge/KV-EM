import "./login.style.css";
import loginImage from "../../assets/kv-login.jpeg";
import kvLogo from "../../assets/kv-logo.png";
import Button from "../../components/button/Button";
import TextField from "../../components/formElements/TextField";
import fieldData from "./fieldData";

const Login = ({ login, setLogin }) => (
  <main className="login-main">
    <div className="login-hero">
      <div>
        <img className="login-image" src={loginImage} alt="Login Image" />
      </div>
    </div>
    <div className="login">
      <form className="login-form" action="/" method="post">
        <img src={kvLogo} alt="Logo" className="login-logo" />
        {fieldData.map(({ label, type, placeholder }) => (
          <TextField
            key={label}
            label={label}
            type={type}
            placeholder={placeholder}
          />
        ))}
        <Button innerText="Login" login={login} setLogin={setLogin} />
      </form>
    </div>
  </main>
);

export default Login;

import "./login.style.css";
import loginImage from "../../assets/kv-login.jpeg";
import kvLogo from "../../assets/kv-logo.png";
import Button from "../../components/button/Button";
import TextField from "../../components/formElements/TextField";
import { useEffect, useRef, useState } from "react";
import Toast from "../../components/toast/toast";

const Login = ({ login, setLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [validate, setValidate] = useState({ status: true, message: "" });

  const usernameRef = useRef(null);

  const handleUsernameChange = (e) => {
    if (e.target.value.length > 10)
      setValidate({
        status: false,
        message: "Username should have max 10 characters",
      });
    else {
      setValidate({ status: true });
      setUsername(e.target.value);
    }
  };

  const handlePasswordChange = (e) => {
    if (e.target.value.length < 6) {
      setValidate({
        status: false,
        message: "Password should have atleaast 6 characters",
      });
      setPassword(e.target.value);
    } else if (e.target.value.length > 16) {
      setValidate({
        status: false,
        message: "Password should have max 16 characters",
      });
    } else {
      setValidate({ status: true });
      setPassword(e.target.value);
    }
  };

  const fieldData = [
    {
      label: "Username",
      type: "text",
      placeholder: "username",
      text: username,
      handleChange: handleUsernameChange,
      ref: usernameRef,
    },
    {
      label: "Password",
      type: "password",
      placeholder: "password",
      text: password,
      handleChange: handlePasswordChange,
    },
  ];

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  return (
    <main className="login-main">
      <Toast
        showToast={!validate.status}
        message={validate.message}
        status="fail"
      />

      <div className="login-hero">
        <div>
          <img className="login-image" src={loginImage} alt="Login Image" />
        </div>
      </div>
      <div className="login">
        <form className="login-form" action="/" method="post">
          <img src={kvLogo} alt="Logo" className="login-logo" />
          {fieldData.map(
            ({ label, type, placeholder, text, handleChange, ref }) => (
              <TextField
                key={label}
                label={label}
                type={type}
                placeholder={placeholder}
                text={text}
                handleChange={handleChange}
                {...(ref ? { ref } : "")}
              />
            )
          )}
          <Button innerText="Login" login={login} setLogin={setLogin} />
        </form>
      </div>
    </main>
  );
};

export default Login;

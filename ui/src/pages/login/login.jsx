import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.style.css";
import loginImage from "../../assets/kv-login.jpeg";
import kvLogo from "../../assets/kv-logo.png";
import Button from "../../components/button/Button";
import TextField from "../../components/formElements/TextField";
import Toast from "../../components/toast/toast";
import { useLoginMutation } from "./login.api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [validate, setValidate] = useState({ status: true, message: "" });

  const usernameRef = useRef(null);

  const navigate = useNavigate();
  const [login, { isSuccess, data, isError }] = useLoginMutation();

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("kvLogin", data.token);
      navigate("/employee/create");
    } else if (isError) {
      setValidate({
        status: false,
        message: "Credentials Wrong, Try again!!",
      });
    }
  }, [isSuccess, isError, data, navigate]);

  const handleUsernameChange = (e) => {
    if (e.target.value.length > 30)
      setValidate({
        status: false,
        message: "Username can have max 30 characters",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ email: username, password });
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
        <form
          className="login-form"
          action="/"
          method="post"
          onSubmit={handleSubmit}
        >
          <img src={kvLogo} alt="Logo" className="login-logo" />
          {fieldData.map(
            ({ label, type, placeholder, text, handleChange, ref }) => (
              <TextField
                key={label}
                label={label}
                type={type}
                placeholder={placeholder}
                value={text}
                handleChange={handleChange}
                {...(ref ? { ref } : "")}
              />
            )
          )}
          <Button innerText="Login" />
        </form>
      </div>
    </main>
  );
};

export default Login;

import "./button.style.css";

const Button = ({
  innerText,
  type = "submit",
  style = "normal",
  login = false,
  setLogin = () => null,
}) => (
  <button
    type={type}
    className={style === "outline" ? "outline-btn" : "normal-btn"}
    onClick={setLogin ? setLogin(!login) : ""}
  >
    {innerText}
  </button>
);

export default Button;

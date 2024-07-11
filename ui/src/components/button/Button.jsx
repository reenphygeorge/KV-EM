import "./button.style.css";

const Button = ({
  innerText,
  type = "submit",
  style = "normal",
  onClick = () => null,
}) => (
  <button
    type={type}
    className={style === "outline" ? "outline-btn" : "normal-btn"}
    onClick={onClick ? onClick : ""}
  >
    {innerText}
  </button>
);

export default Button;

/* eslint-disable no-unused-vars */
import React from "react";
import "./button.style.css";

const Button = ({
  innerText,
  type = "submit",
  style = "normal",
  onClick = () => null,
}) => (
  <button
    type={type}
    data-testid="button-component"
    className={style === "outline" ? "outline-btn" : "normal-btn"}
    onClick={onClick ? onClick : ""}
  >
    {innerText}
  </button>
);

export default Button;

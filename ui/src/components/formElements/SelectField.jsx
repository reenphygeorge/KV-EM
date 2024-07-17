/* eslint-disable no-unused-vars */
import React from "react";
import "./formElements.style.css";

const SelectField = ({ id, label, options, value, handleChange }) => (
  <div className="input-wrap" data-testid="select-wrap">
    <label htmlFor={id}>{label}</label>
    <select id={id} value={value} data-testid="select" onChange={handleChange}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default SelectField;

/* eslint-disable no-unused-vars */
import React, { forwardRef } from "react";
import "./formElements.style.css";

const TextFieldComponent = (
  {
    label,
    id,
    type,
    value = "",
    handleChange = () => null,
    required = false,
    disabled = false,
  },
  ref
) => {
  return (
    <div className="input-wrap" data-testid="input-wrap">
      <label htmlFor={id} data-testid="label">
        {label}
      </label>
      <input
        data-testid="input"
        ref={ref}
        value={value}
        id={id}
        type={type}
        placeholder={label}
        onChange={handleChange}
        required={required}
        disabled={disabled}
      />
    </div>
  );
};

const TextField = forwardRef(TextFieldComponent);

export default TextField;

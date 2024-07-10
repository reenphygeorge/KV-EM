import { forwardRef } from "react";
import "./formElements.style.css";

const TextFieldComponent = (
  { label, id, type, text = "", handleChange = () => null },
  ref
) => {
  return (
    <div className="input-wrap">
      <label htmlFor={label}>{label}</label>
      <input
        ref={ref}
        value={text}
        id={id}
        type={type}
        placeholder={label}
        onChange={handleChange}
        required
      />
    </div>
  );
};

const TextField = forwardRef(TextFieldComponent);

export default TextField;

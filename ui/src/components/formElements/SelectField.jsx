import "./formElements.style.css";

const SelectField = ({ id, label, options, value, handleChange }) => (
  <div className="input-wrap">
    <label htmlFor={label}>{label}</label>
    <select id={id} value={value} onChange={handleChange}>
      <option value="" selected disabled>
        choose a role
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default SelectField;

import "./formElements.style.css";

const SelectField = ({ id, label, options, text, handleChange }) => (
  <div className="input-wrap">
    <label htmlFor={label}>{label}</label>
    <select id={id} value={text} onChange={handleChange}>
      <option value="" selected disabled>
        choose a role
      </option>
      {options.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  </div>
);

export default SelectField;

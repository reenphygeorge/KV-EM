import "./formElements.style.css";

const SelectField = ({ label, options }) => (
  <div className="input-wrap">
    <label htmlFor={label}>{label}</label>
    <select id={label}>
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

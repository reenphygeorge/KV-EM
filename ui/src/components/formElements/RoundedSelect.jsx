import "./roundedSelect.style.css";

const RoundedSelect = ({ id, label, options, value, handleChange }) => (
  <div className="input-wrap">
    <label htmlFor={label}>{label}</label>
    <select
      id={id}
      value={value}
      onChange={handleChange}
      className="rounded-select"
    >
      {options.map((option) => (
        <option key={option} value={option} className="rounded-options">
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default RoundedSelect;

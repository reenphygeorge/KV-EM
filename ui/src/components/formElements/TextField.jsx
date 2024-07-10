import "./formElements.style.css";

const TextField = ({ label, type }) => (
  <div className="input-wrap">
    <label htmlFor={label}>{label}</label>
    <input type={type} placeholder={label} required />
  </div>
);

export default TextField;

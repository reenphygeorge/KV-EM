import "./modal.style.css";

const Modal = ({ child, size = "default" }) => {
  return <div className={`modal ${size}`}>{child}</div>;
};

export default Modal;

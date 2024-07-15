import { IoClose } from "react-icons/io5";
import "./deleteEmployee.style.css";
import Button from "../../components/button/Button";

const DeleteEmployee = ({ deleteHandler, cancelHandler }) => {
  return (
    <div>
      <div className="close-icon-wrap" onClick={cancelHandler}>
        <IoClose size="25px" />
      </div>
      <div className="delete-msg-wrap">
        <h2>Are you Sure ?</h2>
        <h4>
          Do you really want to delete <br />
          employee ?
        </h4>
        <div className="button-wrap">
          <Button innerText="Confirm" onClick={deleteHandler} />
          <Button
            innerText="Cancel"
            type="reset"
            style="outline"
            onClick={cancelHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteEmployee;

import Button from "../../components/button/Button";
import SelectField from "../../components/formElements/SelectField";
import TextField from "../../components/formElements/TextField";
import Sidebar from "../../components/sidebar/Sidebar";
import "./createEmployee.style.css";
import fieldData from "./fieldData";

const CreateEmployee = () => (
  <>
    <Sidebar />
    <main className="create-main">
      <section className="create-section">
        <div className="create-wrap">
          <h1>Create Employee</h1>
        </div>
        <form action="" className="form-wrap">
          {fieldData.map((data) =>
            data.select ? (
              <SelectField
                key={data.label}
                label={data.label}
                options={data.options}
              />
            ) : (
              <TextField key={data.label} label={data.label} type={data.type} />
            )
          )}
          <div className="button-wrap">
            <Button innerText="Create" />
            <Button innerText="Cancel" type="reset" style="outline" />
          </div>
        </form>
      </section>
    </main>
  </>
);

export default CreateEmployee;

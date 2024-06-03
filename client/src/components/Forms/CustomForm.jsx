import PropTypes from "prop-types";
import { Form } from "react-router-dom";

function CustomForm({ label, buttonText }) {
  return (
    <Form method="post">
      <label htmlFor="name">{label}</label>{" "}
      <input type="text" id="name" name="name" />
      <button type="submit">{buttonText}</button>
    </Form>
  );
}

CustomForm.propTypes = {
  label: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default CustomForm;

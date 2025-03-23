import React from "react";
import { Form, Alert } from "react-bootstrap";
import styles from "../../styles/SignUpForm.module.css";

const FormInput = ({ id, label, type, placeholder, name, value, onChange, errors }) => (
  <Form.Group controlId={id}>
    <Form.Label className="d-none">{label}</Form.Label>
    <Form.Control
      className={styles.Input}
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
    {errors?.map((message, idx) => (
      <Alert key={idx} variant="warning" className={styles.ErrorMsg}>
        <i className="fa-solid fa-triangle-exclamation"></i> {message}
      </Alert>
    ))}
  </Form.Group>
);

export default FormInput;
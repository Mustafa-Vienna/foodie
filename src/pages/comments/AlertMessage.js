import React from "react";
import { Alert } from "react-bootstrap";

const AlertMessage = ({ success, error }) => (
  <>
    {success && <Alert variant="success">{success}</Alert>}
    {error && <Alert variant="danger">{error}</Alert>}
  </>
);

export default AlertMessage;
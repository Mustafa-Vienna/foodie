import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Col, Row, Container, Alert } from "react-bootstrap";
import styles from "../../styles/SignUpForm.module.css";
import sharedStyles from "../../styles/SharedStyles.module.css";
import FormInput from "../auth/FormInput";

const BASE_API_URL = process.env.REACT_APP_API_BASE_URL;

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });

  const { username, email, password1, password2 } = signUpData;
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let customErrors = {};

    if (!username.trim()) {
      customErrors.username = ["Username is required!"];
    } else if (username.length > 20) {
      customErrors.username = ["Username must not be exceed 20 characters!"];
    }

    if (!email.trim()) {
      customErrors.email = ["Email is required!"];
    }

    if (!password1.trim()) {
      customErrors.password1 = ["Password is required!"];
    } else if (password1.length < 6) {
      customErrors.password1 = ["Password must be at least 6 characters long!"];
    }

    if (!password2.trim()) {
      customErrors.password2 = ["Confirm Password is required!"];
    } else if (password1 !== password2) {
      customErrors.password2 = ["Passwords do not match!"];
    }

    if (Object.keys(customErrors).length > 0) {
      setErrors(customErrors);
      return;
    }

    try {
      const response = await axios.post(`${BASE_API_URL}/dj-rest-auth/registration/`, signUpData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);

      navigate("/signin");
    } catch (err) {
      console.error("Registration error:", err.response);
      setErrors(err.response?.data || {});
    }
  };

  return (
    <Row className={sharedStyles.flexCenterFullHeight}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${styles.container} ${sharedStyles.contentContainer}`}>
          <h1 className={styles.header}>Sign Up</h1>

          <Form onSubmit={handleSubmit}>
            <FormInput
              id="username"
              label="Username"
              type="text"
              placeholder="Enter your username"
              name="username"
              value={username}
              onChange={handleChange}
              errors={errors.username}
            />

            <FormInput
              id="email"
              label="Email"
              type="email"
              placeholder="Enter your Email address"
              name="email"
              value={email}
              onChange={handleChange}
              errors={errors.email}
            />

            <FormInput
              id="password1"
              label="Password"
              type="password"
              placeholder="Enter your password"
              name="password1"
              value={password1}
              onChange={handleChange}
              errors={errors.password1}
            />

            <FormInput
              id="password2"
              label="Confirm Password"
              type="password"
              placeholder="Re-enter your password"
              name="password2"
              value={password2}
              onChange={handleChange}
              errors={errors.password2}
            />

            <Button className={`${sharedStyles.button} ${sharedStyles["button--wide"]} ${sharedStyles["button--bright"]}`} type="submit">
              Sign Up
            </Button>

            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className={`${styles.errorMsg} ${sharedStyles.message} ${sharedStyles["message--warning"]}`}>
                <i className="fa-solid fa-triangle-exclamation"></i> {message}
              </Alert>
            ))}
          </Form>
        </Container>

        <Container className={`${styles.container} ${sharedStyles.contentContainer} mt-3`}>
          <Link className={sharedStyles.link} to="/signin">
            Already have an account? <span className={styles.linkHighlight}>Sign in</span>
          </Link>
        </Container>
      </Col>

      <Col md={6} className={`my-auto d-none d-md-block p-2 ${styles.signUpCol}`}>
      </Col>
    </Row>
  );
};

export default SignUpForm;
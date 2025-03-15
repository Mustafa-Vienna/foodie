import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Image, Col, Row, Container, Alert } from "react-bootstrap";

import styles from "../../styles/SignUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";


const BASE_API_URL = process.env.REACT_APP_API_BASE_URL

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
      customErrors.username = ["Username must not be exceed 20 characters!"]
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
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4`}>
          <h1 className={styles.Header}>Sign Up</h1>

          <Form onSubmit={handleSubmit}>
            {/* Username Field */}
            <Form.Group controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="Enter your username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert key={idx} variant="warning" className={styles.ErrorMsg}>
                <i className="fa-solid fa-triangle-exclamation"></i>
                {message}
              </Alert>
            ))}

            {/* Email Field */}
            <Form.Group controlId="email">
              <Form.Label className="d-none">Email</Form.Label>
              <Form.Control
                className={styles.Input}
                type="email"
                placeholder="Enter your Email address"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.email?.map((message, idx) => (
              <Alert key={idx} variant="warning" className={styles.ErrorMsg}>
                <i className="fa-solid fa-triangle-exclamation"></i>
                {message}
              </Alert>
            ))}


            {/* Password Field */}
            <Form.Group controlId="password1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Enter your password"
                name="password1"
                value={password1}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password1?.map((message, idx) => (
              <Alert key={idx} variant="warning" className={styles.ErrorMsg}>
                <i className="fa-solid fa-triangle-exclamation"></i>
                {message}
              </Alert>
            ))}

            {/* Confirm Password Field */}
            <Form.Group controlId="password2">
              <Form.Label className="d-none">Confirm Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Re-enter your password"
                name="password2"
                value={password2}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password2?.map((message, idx) => (
              <Alert key={idx} variant="warning" className={styles.ErrorMsg}>
                <i className="fa-solid fa-triangle-exclamation"></i>
                {message}
              </Alert>
            ))}

            {/* Submit Button */}
            <Button className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`} type="submit">
              Sign Up
            </Button>

            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className={`mt-3 ${styles.ErrorMsg}`}>
                <i className="fa-solid fa-triangle-exclamation"></i>
                {message}
              </Alert>
            ))}
          </Form>
        </Container>

        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signin">
            Already have an account? <span>Sign in</span>
          </Link>
        </Container>
      </Col>

      {/* Right Side Image */}
      <Col md={6} className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}>
        <Image className={appStyles.FillerImage} />
      </Col>
    </Row>
  );
};

export default SignUpForm;
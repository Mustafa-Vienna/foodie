import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Image, Col, Row, Container, Alert } from "react-bootstrap";

import styles from "../../styles/SignUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";

const BASE_API_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

const SignInForm = () => {
  const setCurrentUser = useSetCurrentUser();
  const navigate = useNavigate();

  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation
    let customErrors = {};

    if (!signInData.username.trim()) {
      customErrors.username = ["Username is required!"];
    } else if (signInData.username.length > 20) {
      customErrors.username = ["Username must not exceed 20 characters!"];
    }

    if (!signInData.password.trim()) {
      customErrors.password = ["Password is required!"];
    } else if (signInData.password.length < 6) {
      customErrors.password = ["Password must be at least 6 characters long!"];
    }

    if (Object.keys(customErrors).length > 0) {
      setErrors(customErrors);
      return;
    }

    try {
      const { data } = await axios.post(`${BASE_API_URL}/token/`, signInData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
  
      if (data.access) {
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
  
        // Store user data
        if (data.user) {
          localStorage.setItem("currentUser", JSON.stringify(data.user));
          setCurrentUser(data.user);
        } else {
          console.error("Login failed: No user details received.");
        }
      } else {
        console.error("Login failed: No access token received.");
      }
  
      navigate("/");
    } catch (err) {
      console.error("Login error:", err.response);
  
      if (err.response?.data?.non_field_errors) {
        setErrors({ password: ["Invalid username or password! Please try again!"] });
      } else {
        setErrors(err.response?.data || {});
      }
    }
  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4`}>
          <h1 className={styles.Header}>Sign In</h1>

          <Form onSubmit={handleSubmit}>
            {/* Username Field */}
            <Form.Group controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="Enter your username"
                name="username"
                value={signInData.username}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert key={idx} variant="warning" className={styles.ErrorMsg}>
                <i className="fa-solid fa-triangle-exclamation"></i>&nbsp;
                {message}
              </Alert>
            ))}

            {/* Password Field */}
            <Form.Group controlId="password">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Enter your password"
                name="password"
                value={signInData.password}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password?.map((message, idx) => (
              <Alert key={idx} variant="warning" className={styles.ErrorMsg}>
                <i className="fa-solid fa-triangle-exclamation"></i>&nbsp;
                {message}
              </Alert>
            ))}

            {/* Submit Button */}
            <Button className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`} type="submit">
              Sign In
            </Button>

            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className={`mt-3 ${styles.ErrorMsg}`}>
                <i className="fa-solid fa-triangle-exclamation"></i>&nbsp;
                {message}
              </Alert>
            ))}
          </Form>
        </Container>

        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signup">
            Don't have an account? <span>Sign up now!</span>
          </Link>
        </Container>
      </Col>

      {/* Right Side Image */}
      <Col md={6} className={`my-auto d-none d-md-block p-2 ${styles.SignInCol}`}>
        <Image className={appStyles.FillerImage} />
      </Col>
    </Row>
  );
};

export default SignInForm;

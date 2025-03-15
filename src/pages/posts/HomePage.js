import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "../../styles/HomePage.module.css";

const HomePage = () => {
  return (
    <Container className={styles.container}>
      <Row className="text-center">
        <Col>
          <h1 className={`display-4 fw-bold ${styles.heroTitle}`}>
            Welcome to Foodie
            <i className="fa-solid fa-bowl-food"></i>
          </h1>
          <p className={`lead ${styles.heroText}`}>
            Find, cook, and share your favorite dishes with a vibrant community of food lovers.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
// src/pages/posts/HomePage.js
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../../styles/HomePage.module.css";
import logo from "../../assets/images/logo.webp";

const HomePage = () => {
  return (
    <Container className={styles.container}>
      <Row className="text-center">
        {/* Left Side (Text & Buttons) */}
        <Col md={6} className="my-auto">
          <div className={styles.heroSection}>
            <img src={logo} alt="Foodie Logo" className={`mb-4 ${styles.logo}`} />
            <h1 className={`lead fw-bold ${styles.heroTitle}`}>
              Welcome to Foodie
              <i className="fa-solid fa-bowl-food"></i>
            </h1>
            <p className={styles.heroText}>
            Discover a world of flavor with Foodie where culinary passion meets community. 
            Browse thousands of chef-crafted and home-inspired recipes, share your signature 
            dishes, and connect with food lovers who speak your language. From kitchen 
            novices to seasoned pros, Foodie transforms every meal into an adventure worth sharing.
            </p>
            <div className={styles.buttonContainer}>
              <Link to="/feed">
                <Button variant="primary" className="me-2">Explore Recipes</Button>
              </Link>
              <Link to="/posts/create">
                <Button variant="success">Share Your Recipe</Button>
              </Link>
            </div>
          </div>
        </Col>

        {/* Right Side (Background Image) */}
        <Col md={6} className={`my-auto d-none d-md-block ${styles.HomePageCol}`}>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;

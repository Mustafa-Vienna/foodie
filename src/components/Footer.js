import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../styles/Footer.module.css";
import sharedStyles from "../styles/SharedStyles.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <Row className="g-4">
          {/* About Column */}
          <Col md={4}>
            <h5 className={styles.footerHeading}>About Foodie</h5>
            <p className={sharedStyles.textMuted}>
              Foodie is a community for food lovers to share and discover delicious recipes.
            </p>
          </Col>

          <Col md={4}>
            <h5 className={styles.footerHeading}>Quick Links</h5>
            <ul className={styles.footerLinks}>
              <li><Link to="/" className={sharedStyles.link}>Home</Link></li>
              <li><Link to="/feed" className={sharedStyles.link}>Feed</Link></li>
            </ul>
          </Col>

          {/* Contact Column */}
          <Col md={4}>
            <h5 className={styles.footerHeading}>Contact Us</h5>
            <ul className={styles.contactInfo}>
              <li className={sharedStyles.textMuted}>
                <i className={`fa-solid fa-envelope ${styles.contactIcon}`}></i>
                vip@foodie.com
              </li>
              <li className={sharedStyles.textMuted}>
                <i className={`fa-solid fa-phone ${styles.contactIcon}`}></i>
                +1 (333) 123-4567
              </li>
            </ul>
          </Col>
        </Row>

        {/* Social Links */}
        <div className={`${sharedStyles.flexCenter} ${sharedStyles.textMuted}`}>
          <a href="https://facebook.com" className={sharedStyles.commentLink} aria-label="Facebook">
            <i className="fa-brands fa-facebook-f"></i>
          </a>
          <a href="https://instagram.com" className={sharedStyles.commentLink} aria-label="Instagram">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="https://youtube.com" className={sharedStyles.commentLink} aria-label="YouTube">
            <i className="fa-brands fa-youtube"></i>
          </a>
        </div>

        {/* Copyright */}
        <div className={`${styles.footer} ${sharedStyles.textMuted} text-center`}>
          © {new Date().getFullYear()} Foodie. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
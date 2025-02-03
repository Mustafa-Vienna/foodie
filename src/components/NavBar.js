import React from "react";
import { Container, Navbar, Nav } from 'react-bootstrap'
import { Link } from "react-router-dom";
import styles from '../styles/NavBar.module.css'
import logo from '../assets/images/logo.webp'


const NavBar = () => {
  return (
      <Navbar expand="md" fixed="top" className={`navbar navbar-expand-lg navbar-dark ${styles.navbarCustom}`}>
      <Container>
        {/* Logo with link to Home */}
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="Foodie Logo" className={styles.logo} />
        </Navbar.Brand>
          
        {/* Navbar Toggle for Mobile View */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className={styles.NavLink}> <i className="fa-solid fa-house"></i>Home</Nav.Link>
            <Nav.Link as={Link} to="/signin" className={styles.NavLink}> <i className="fa-solid fa-right-to-bracket"></i>Sign in</Nav.Link>
            <Nav.Link as={Link} to="/signup" className={styles.NavLink}> <i className="fa-solid fa-user-plus"></i>Sign up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}

export default NavBar;
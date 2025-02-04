import React from "react";
import { Container, Navbar, Nav } from 'react-bootstrap'
import { NavLink } from "react-router-dom";
import styles from '../styles/NavBar.module.css'
import logo from '../assets/images/logo.webp'


const NavBar = () => {
  return (
      <Navbar expand="md" fixed="top" className={`navbar navbar-expand-lg navbar-dark ${styles.navbarCustom}`}>
      <Container>
        
        {/* Logo with link to Home */}
        <NavLink to="/" className={styles.navBrand}>
        <Navbar.Brand>
          <img src={logo} alt="Foodie Logo" className={styles.logo} />
        </Navbar.Brand></NavLink>
          
        {/* Navbar Toggle for Mobile View */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto text-left">

            <NavLink
              to="/"
              activeClassName = {styles.Active}
              className={({ isActive }) => isActive ? `${styles.navLink} ${styles.Active}` : styles.navLink}>
              <i className="fa-solid fa-house"></i>Home
            </NavLink>
            
            <NavLink
              to="/signin"
              activeClassName = {styles.Active}
              className={({ isActive }) => isActive ? `${styles.navLink} ${styles.Active}` : styles.navLink}>
              <i className="fa-solid fa-right-to-bracket"></i>Sign in
            </NavLink>

            <NavLink
              to="/signup"
              activeClassName = {styles.Active}
              className={({ isActive }) => isActive ? `${styles.navLink} ${styles.Active}` : styles.navLink}>
              <i className="fa-solid fa-user-plus"></i>Sign up
            </NavLink>

          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}

export default NavBar;
import React from "react";
import { Container, Navbar, Nav } from 'react-bootstrap'
import { NavLink } from "react-router-dom";
import styles from '../styles/NavBar.module.css'
import logo from '../assets/images/logo.webp'
import { useCurrentUser } from "../contexts/CurrentUserContext";


const NavBar = () => {
  const currentUser = useCurrentUser();
  console.log("Current User: ", currentUser); //For debugging purpose

  const loggedInIcons = <>{currentUser?.username}</>

  const loggedOutIcons = (
    <>
      <NavLink
        to="/signin"
        activeclassname = {styles.Active}
        className={({ isActive }) => isActive ? `${styles.navLink} ${styles.Active}` : styles.navLink}>
        <i className="fa-solid fa-right-to-bracket"></i>Sign in
      </NavLink>

      <NavLink
        to="/signup"
        activeclassname = {styles.Active}
        className={({ isActive }) => isActive ? `${styles.navLink} ${styles.Active}` : styles.navLink}>
        <i className="fa-solid fa-user-plus"></i>Sign up
      </NavLink>
    </>
  );

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
              activeclassname = {styles.Active}
              className={({ isActive }) => isActive ? `${styles.navLink} ${styles.Active}` : styles.navLink}>
              <i className="fa-solid fa-house"></i>Home
            </NavLink>

            {currentUser ? loggedInIcons : loggedOutIcons }

          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}

export default NavBar;
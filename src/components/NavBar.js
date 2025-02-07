import React from "react";
import { Container, Navbar, Nav } from 'react-bootstrap'
import { NavLink } from "react-router-dom";
import styles from '../styles/NavBar.module.css'
import logo from '../assets/images/logo.webp'
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import { axiosReq } from "../api/axiosDefault";


const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const handleSignOut = async () => {
    try {
      await axiosReq.post("/dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log("Error logging out: ", err);
    }
  };

  const addPostIcon = (
    <NavLink
      to="/posts/create"
      className={({ isActive }) => isActive ? `${styles.navLink} ${styles.Active}` : styles.navLink}>
      <i className="fa-solid fa-square-plus"></i>Add Post
    </NavLink>
  );

  const loggedInIcons = (
    <>
      <NavLink
        to="/feed"
        className={({ isActive }) => isActive ? `${styles.navLink} ${styles.Active}` : styles.navLink}>
        <i className="fa-solid fa-bars-staggered"></i>Feed
      </NavLink>
        
      <NavLink
        to="/liked"
        className={({ isActive }) => isActive ? `${styles.navLink} ${styles.Active}` : styles.navLink}>
        <i className="fa-solid fa-heart"></i>Liked
      </NavLink>
      
      {/* SignOut */}
      <NavLink
        to="/"
        onClick={handleSignOut}
        className={({ isActive }) => isActive ? `${styles.navLink} ${styles.Active}` : styles.navLink}>
        <i className="fa-solid fa-right-from-bracket"></i>Sign out
      </NavLink>

      <NavLink
        to={`/profiles/${currentUser?.profile_id}`}
        className={({ isActive }) => isActive ? `${styles.navLink} ${styles.Active}` : styles.navLink}>
        <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
      </NavLink>
    </>
  );

  const loggedOutIcons = (
    <>
      <NavLink
        to="/signin"
        className={({ isActive }) => isActive ? `${styles.navLink} ${styles.Active}` : styles.navLink}>
        <i className="fa-solid fa-right-to-bracket"></i>Sign in
      </NavLink>

      <NavLink
        to="/signup"
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
          </Navbar.Brand>
        </NavLink>
          
        {currentUser && addPostIcon}

        {/* Navbar Toggle for Mobile View */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto text-left">

            <NavLink
              to="/"
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
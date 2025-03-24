import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "../styles/NavBar.module.css";
import sharedStyles from "../styles/SharedStyles.module.css";
import logo from "../assets/images/logo.webp";
import { useCurrentUser, useLogout } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";

const getNavLinkClass = ({ isActive }) =>
  `${styles.navLink} ${sharedStyles.flexCenter} ${sharedStyles.colorTransition} ${
    isActive ? styles.active : ""
  }`.trim();

const navItem = (to, icon, text, onClick, setExpanded) => (
  <NavLink
    to={to}
    className={getNavLinkClass}
    onClick={() => {
      if (onClick) onClick();
      if (setExpanded) setExpanded(false);
    }}
  >
    <i className={`fa-solid ${icon} ${styles.navIcon} ${sharedStyles.colorTransition}`}></i> {text}
  </NavLink>
);

const NavBar = () => {
  const currentUser = useCurrentUser();
  const logout = useLogout();
  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  return (
    <Navbar ref={ref} expand="md" fixed="top" className={`navbar navbar-expand-lg navbar-dark ${styles.navbarCustom}`}>
      <Container>
        <NavLink to="/" className={`${styles.navBrand} ${sharedStyles.flexCenter}`}>
          <Navbar.Brand>
            <img src={logo} alt="Foodie Logo" className={`${styles.logo} ${sharedStyles.transformTransition}`} />
          </Navbar.Brand>
        </NavLink>

        {currentUser && navItem("/posts/create", "fa-square-plus", "Add Post", null, setExpanded)}

        <Navbar.Toggle onClick={() => setExpanded((prev) => !prev)} aria-controls="basic-navbar-nav" />
        <Navbar.Collapse in={expanded} id="basic-navbar-nav">
          <Nav className="ms-auto text-left">
            {navItem("/", "fa-house", "Home", null, setExpanded)}
            {currentUser ? (
              <>
                {navItem("/feed", "fa-bars-staggered", "Feed", null, setExpanded)}
                {navItem("/liked", "fa-heart", "Liked", null, setExpanded)}

                <span
                  className={`${styles.navLink} ${sharedStyles.flexCenter} ${sharedStyles.colorTransition} ${styles.signOut}`}
                  onClick={() => {
                    logout();
                  }}
                >
                  <i className={`fa-solid fa-right-from-bracket ${styles.navIcon} ${sharedStyles.colorTransition}`}></i> Sign Out
                </span>
                <NavLink
                  to={`/profiles/${currentUser?.profile_id}`}
                  className={getNavLinkClass}
                  onClick={() => setExpanded(false)}
                >
                  <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
                </NavLink>
              </>
            ) : (
              <>
                {navItem("/signin", "fa-right-to-bracket", "Sign in", null, setExpanded)}
                {navItem("/signup", "fa-user-plus", "Sign up", null, setExpanded)}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
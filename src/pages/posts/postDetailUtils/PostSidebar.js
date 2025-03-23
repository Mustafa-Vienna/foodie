import React from "react";
import { Card } from "react-bootstrap";
import styles from "../../../styles/PostDetailPage.module.css";

const PostSidebar = () => {
  return (
    <Card className={styles.sidebarCard}>
      <Card.Body>
        <h5 className={styles.sidebarTitle}>Popular Profiles</h5>
        <p>(Content to be added)</p>
      </Card.Body>
    </Card>
  );
};

export default PostSidebar;
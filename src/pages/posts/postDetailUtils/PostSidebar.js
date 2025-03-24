import React from "react";
import { Card } from "react-bootstrap";
import styles from "../../../styles/PostDetailPage.module.css";
import sharedStyles from "../../../styles/SharedStyles.module.css";

const PostSidebar = () => {
  return (
    <Card className={`${styles.sidebarCard} ${sharedStyles.baseCard}`}>
      <Card.Body>
        <h5 className={styles.sidebarTitle}>Popular Profiles</h5>
        <p>(Content to be added)</p>
      </Card.Body>
    </Card>
  );
};

export default PostSidebar;
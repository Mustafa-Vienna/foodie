import React from "react";
import { Spinner } from "react-bootstrap";
import styles from "../styles/Asset.module.css";
import sharedStyles from "../styles/SharedStyles.module.css";

const Asset = ({ spinner, src, message = "" }) => {
  return (
    <div className={`${styles.asset} ${sharedStyles.flexColumnCenter} p-4`}>
      {spinner && <Spinner animation="border" />}
      {src && <img src={src} alt={message} className={styles.image} />}
      {message && <p className={`mt-4 ${sharedStyles.message}`}>{message}</p>}
    </div>
  );
};

export default Asset;
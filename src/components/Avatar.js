import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Avatar.module.css";
import sharedStyles from "../styles/SharedStyles.module.css";
import profileImg from "../assets/images/profile.jpg";

const Avatar = ({ src = profileImg, height = 45, text, profileId }) => {
  const avatarContent = (
    <span className={styles.avatarContainer}>
      <img
        className={`${styles.avatar} ${sharedStyles.circle}`}
        src={src}
        height={height}
        width={height}
        alt="avatar"
      />
      {text}
    </span>
  );

  // If profileId is provided, make the avatar a clickable link
  return profileId ? (
    <Link to={`/profiles/${profileId}`} className={styles.avatarLink}>
      {avatarContent}
    </Link>
  ) : (
    avatarContent
  );
};

export default Avatar;
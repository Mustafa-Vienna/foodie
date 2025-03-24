import React from "react";
import styles from "../styles/Avatar.module.css";
import sharedStyles from "../styles/SharedStyles.module.css";
import profileImg from "../assets/images/profile.jpg";

const Avatar = ({ src = profileImg, height = 45, text }) => {
  return (
    <span>
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
};

export default Avatar;
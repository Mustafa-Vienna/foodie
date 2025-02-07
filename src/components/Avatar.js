import React from 'react'
import styles from '../styles/Avatar.module.css'

const Avatar = ({ src, height = 45, text }) => {
  const defaultAvatar =
    "https://res.cloudinary.com/duemxeswe/image/upload/v1737306346/default_profile_girwrs.jpg";
  return (
    <span>
      <img className={styles.Avatar} src={src || defaultAvatar}
        height={height} width={height} alt="avatar" />
      {text}
    </span>
  );
};

export default Avatar;
import React, { useState } from "react";
import styles from "../../styles/LikeButton.module.css";

const LikeButton = ({ postId, likesCount }) => {
  const [liked, setLiked] = useState(false);
  const handleLike = () => {
    setLiked(!liked);
  };
  return (

    <button onClick={handleLike} className={styles.likeButton}>
      <i className={liked ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i> {likesCount}
    </button>
  );
};

export default LikeButton;
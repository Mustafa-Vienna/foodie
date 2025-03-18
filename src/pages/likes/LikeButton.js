import React, { useState } from "react";
import { axiosReq } from "../../api/axiosDefault";
import styles from "../../styles/LikeButton.module.css";

const LikeButton = ({ postId, likesCount, setLikesCount }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    try {
      if (liked) {
        await axiosReq.delete(`/likes/${postId}/`);
        setLikesCount((prev) => prev - 1);
      } else {
        await axiosReq.post("/likes/", { post: postId });
        setLikesCount((prev) => prev + 1);
      }
      setLiked(!liked);
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  return (
    <span onClick={handleLike} className={styles.likeButton}>
      <i className={liked ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i> {likesCount}
    </span>
  );
};

export default LikeButton;
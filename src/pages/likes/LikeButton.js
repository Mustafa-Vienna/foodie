import React, { useState } from "react";
import { axiosReq } from "../../api/axiosDefault";
import styles from "../../styles/LikeButton.module.css";
import sharedStyles from "../../styles/SharedStyles.module.css";

const LikeButton = ({ postId, likesCount, setLikesCount, likeId }) => {
  const [liked, setLiked] = useState(!!likeId);
  const [message, setMessage] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      if (liked) {
        await axiosReq.delete(`/likes/post/${postId}/`);
        setLikesCount((prev) => prev - 1);
        setLiked(false);
        setMessage("You unliked the post");
      } else {
        await axiosReq.post("/likes/", { post: postId });
        setLikesCount((prev) => prev + 1);
        setLiked(true);
        setMessage("You liked the post");
      }
    } catch (err) {
      if (err.response?.status === 403) {
        setMessage("Please log in to like this post.");
      } else {
        setMessage("Error, please try again.");
      }
    } finally {
      setIsLoading(false);
      setTimeout(() => setMessage(""), 2000);
    }
  };

  return (
    <div>
      <div className={styles.likeButtonContainer}>
        <button
          onClick={handleLike}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className={`${styles.likeButton} ${sharedStyles.flexCenter} ${isLoading ? sharedStyles.disabled : ""}`}
          disabled={isLoading}
          aria-label={liked ? "Unlike this post" : "Like this post"}
        >
          <i
            className={liked ? "fa-solid fa-heart" : "fa-regular fa-heart"}
            style={{ color: liked ? "var(--color-error)" : "inherit" }}
          ></i>{" "}
          {likesCount}
          {showTooltip && (
            <span className={styles.tooltip}>
              {liked ? "Unlike this post" : "Like this post"}
            </span>
          )}
        </button>
      </div>
      {message && <p className={`${styles.feedbackMessage} ${sharedStyles["message--feedback"]}`}>{message}</p>}
    </div>
  );
};

export default LikeButton;
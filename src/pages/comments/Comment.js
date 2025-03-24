import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/Comment.module.css";
import sharedStyles from "../../styles/SharedStyles.module.css";

const Comment = ({ comment }) => {
  const { author, content, created_at, profile_image, profile_id } = comment;

  return (
    <div className={`${styles.commentContainer} ${sharedStyles.commentsContainer} ${sharedStyles.backgroundTransition}`}>
      <div className={`${styles.commentHeader} ${sharedStyles.flexSpaceBetween}`}>
        <Link to={`/profiles/${profile_id}`} className={`${styles.commentAuthor} ${sharedStyles.flexCenter}`}>
          {profile_image && (
            <img src={profile_image} alt={author} className={`${styles.authorImage} ${sharedStyles.circle}`} />
          )}
          <span>{author}</span>
        </Link>
        <span className={styles.commentDate}>
          {new Date(created_at).toLocaleString()}
        </span>
      </div>
      <div className={styles.commentContent}>{content}</div>
    </div>
  );
};

export default Comment;
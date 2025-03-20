import React from "react";
import styles from "../../styles/Comment.module.css";

const Comment = ({ comment }) => {
  return (
    <div className={styles.commentItem}>
      <div className={styles.commentHeader}>
        <span className={styles.commentAuthor}>{comment.author}</span>
        <span className={styles.commentDate}>{comment.created_at}</span>
      </div>
      <p className={styles.commentText}>{comment.content}</p>
    </div>
  );
};

export default Comment;
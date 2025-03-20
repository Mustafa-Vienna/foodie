import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../../styles/CommentList.module.css";

const CommentList = ({ postId, currentUser }) => {
  return (
    <div className={styles.commentsCard}>
      <h4 className={styles.commentsTitle}>Comments</h4>
      
      {currentUser ? (
        <Form className={styles.commentForm}>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Share your thoughts..."
            className={styles.commentInput}
          />
          <Button
            variant="primary"
            type="submit"
            className={styles.submitCommentBtn}
          >
            Post Comment
          </Button>
        </Form>
      ) : (
        <p className="text-center mt-3">
          <Link to="/signin">Log in</Link> to post a comment.
        </p>
      )}
      
      <p className="text-center mt-3">No comments yet. Be the first to comment!</p>
    </div>
  );
};

export default CommentList;
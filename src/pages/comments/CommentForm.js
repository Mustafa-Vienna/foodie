import React from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../../styles/CommentList.module.css";
import sharedStyles from "../../styles/SharedStyles.module.css";

const CommentForm = ({
  commentText,
  setCommentText,
  handleSubmitComment,
  loading,
  currentUser,
}) => {
  if (!currentUser) {
    return (
      <p className={`${sharedStyles["text--muted"]} text-center mt-3`}>
        <Link to="/signin" className={sharedStyles.link}>
          Log in
        </Link>{" "}
        to post a comment.
      </p>
    );
  }

  return (
    <Form onSubmit={handleSubmitComment} className={styles.commentForm}>
      <Form.Control
        as="textarea"
        id="comment-input"
        name="comment"
        rows={3}
        placeholder="Share your thoughts..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        className={`${styles.commentInput} ${sharedStyles.formInput}`}
        disabled={loading}
        autoComplete="off"
        required
      />
      <div className="text-end mt-2">
        <Button
          type="submit"
          className={`${styles.submitCommentBtn} ${sharedStyles.button} ${sharedStyles["button--orange"]}`}
          disabled={!commentText.trim() || loading}
        >
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              <span className="ms-2">Posting...</span>
            </>
          ) : (
            "Post Comment"
          )}
        </Button>
      </div>
    </Form>
  );
};

export default CommentForm;
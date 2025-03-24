import React from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../../styles/CommentList.module.css";

const CommentForm = ({ commentText, setCommentText, handleSubmitComment, loadingComments, currentUser }) => {
  if (!currentUser) {
    return (
      <p className="text-center mt-3">
        <Link to="/signin">Log in</Link> to post a comment.
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
        className={styles.commentInput}
        disabled={loadingComments}
        autoComplete="off"
        required
      />
      <div className={styles.submitCommentBtnWrapper}>
        <Button
          variant="primary"
          type="submit"
          className={styles.submitCommentBtn}
          disabled={!commentText.trim() || loadingComments}
        >
          {loadingComments ? <Spinner as="span" animation="border" size="sm" /> : "Post Comment"}
        </Button>
      </div>
    </Form>
  );
};

export default CommentForm;
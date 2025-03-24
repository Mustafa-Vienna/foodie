import React, { forwardRef } from "react";
import { Spinner } from "react-bootstrap";
import Comment from "./Comment";
import LoadMoreButton from "./LoadMoreButton";
import styles from "../../styles/CommentList.module.css";
import AlertMessage from "../comments/AlertMessage";

const CommentSection = forwardRef(({
  comments,
  loadingComments,
  hasMore,
  handleLoadMoreComments,
  commentError,
  commentSuccess
}, ref) => {
  return (
    <div ref={ref} id="comments" className={styles.commentsCard}>
      <h4 className={styles.commentsTitle}>Comments</h4>
      <AlertMessage success={commentSuccess} error={commentError} />

      {loadingComments && !comments.length ? (
        <div className="text-center mt-3">
          <Spinner animation="border" size="sm" /> Loading comments...
        </div>
      ) : comments.length ? (
        <>
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
          <LoadMoreButton
            loading={loadingComments}
            hasMore={hasMore}
            onLoadMore={handleLoadMoreComments}
          />
        </>
      ) : (
        <p className="text-center mt-3">No comments yet. Be the first to comment!</p>
      )}
    </div>
  );
});

export default CommentSection;
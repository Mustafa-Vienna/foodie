import React, { useState, useEffect } from "react";
import { axiosReq } from "../../api/axiosDefault";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../../styles/CommentList.module.css";

const CommentList = ({ postId, currentUser }) => {
  const [commentState, setCommentState] = useState({
    comments: [],
    commentText: "",
    commentError: null,
    commentSuccess: null,
    loadingComments: false,
  });

  const { comments, commentText, commentError, commentSuccess, loadingComments } = commentState;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setCommentState((prev) => ({ ...prev, loadingComments: true }));
        const { data } = await axiosReq.get(`/comments/?post=${postId}&page=1`);
        setCommentState((prev) => ({
          ...prev,
          comments: data.results || [],
          loadingComments: false,
        }));
      } catch (err) {
        setCommentState((prev) => ({
          ...prev,
          commentError: "Failed to load comments.",
          loadingComments: false,
        }));
        console.error("Error fetching comments:", err);
      }
    };
    fetchComments();
  }, [postId]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setCommentState((prev) => ({ ...prev, loadingComments: true }));
    try {
      const { data } = await axiosReq.post(`/comments/`, { post: postId, content: commentText });
      setCommentState((prev) => ({
        ...prev,
        comments: [data, ...prev.comments],
        commentText: "",
        commentError: null,
        commentSuccess: "Comment posted successfully!",
        loadingComments: false,
      }));
    } catch (err) {
      setCommentState((prev) => ({
        ...prev,
        commentError: "Failed to post comment. Please try again.",
        commentSuccess: null,
        loadingComments: false,
      }));
      console.error("Error posting comment:", err);
    }
  };

  useEffect(() => {
    if (commentSuccess || commentError) {
      const timer = setTimeout(() => {
        setCommentState((prev) => ({ ...prev, commentSuccess: null, commentError: null }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [commentSuccess, commentError]);

  return (
    <div className={styles.commentsCard}>
      <h4 className={styles.commentsTitle}>Comments</h4>
      {commentSuccess && <Alert variant="success">{commentSuccess}</Alert>}
      {commentError && <Alert variant="danger">{commentError}</Alert>}
      
      {currentUser ? (
        <Form onSubmit={handleSubmitComment} className={styles.commentForm}>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Share your thoughts..."
            value={commentText}
            onChange={(e) => setCommentState((prev) => ({ ...prev, commentText: e.target.value }))}
            className={styles.commentInput}
            disabled={loadingComments}
          />
          <Button
            variant="primary"
            type="submit"
            className={styles.submitCommentBtn}
            disabled={!commentText.trim() || loadingComments}
          >
            {loadingComments ? <Spinner as="span" animation="border" size="sm" /> : "Post Comment"}
          </Button>
        </Form>
      ) : (
        <p className="text-center mt-3">
          <Link to="/signin">Log in</Link> to post a comment.
        </p>
      )}
      
      {loadingComments ? (
        <div className="text-center mt-3">
          <Spinner animation="border" size="sm" /> Loading comments...
        </div>
      ) : comments.length ? (
        <>
          {comments.map((comment) => (
            <div key={comment.id}>
              {/* Placeholder for comment display */}
              <p>{comment.content}</p>
            </div>
          ))}
        </>
      ) : (
        <p className="text-center mt-3">No comments yet. Be the first to comment!</p>
      )}
    </div>
  );
};

export default CommentList;
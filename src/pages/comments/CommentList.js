import React, { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { fetchComments, postComment, updateComment, deleteComment } from "./CommentUtils";
import AlertMessage from "../comments/AlertMessage";
import { Button, Spinner } from "react-bootstrap";
import styles from "../../styles/CommentList.module.css";
import sharedStyles from "../../styles/SharedStyles.module.css";

const CommentList = ({ postId, currentUser }) => {
  const [commentState, setCommentState] = useState({
    comments: [],
    commentText: "",
    commentError: null,
    commentSuccess: null,
    page: 1,
    hasMore: true,
    loadingComments: false,
    modifyingComment: false,
  });

  const {
    comments,
    commentText,
    commentError,
    commentSuccess,
    page,
    hasMore,
    loadingComments,
    modifyingComment,
  } = commentState;

  const updateState = (updates) =>
    setCommentState((prev) => ({ ...prev, ...updates }));

  useEffect(() => {
    const loadInitialComments = async () => {
      updateState({ loadingComments: true });
      try {
        const data = await fetchComments(postId);
        updateState({
          comments: data.results || [],
          hasMore: !!data.next,
          loadingComments: false,
        });
      } catch (err) {
        updateState({
          commentError: "Failed to load comments.",
          loadingComments: false,
        });
      }
    };
    loadInitialComments();
  }, [postId]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    updateState({ loadingComments: true });
    try {
      const data = await postComment(postId, commentText);
      updateState({
        comments: [data, ...comments],
        commentText: "",
        commentError: null,
        commentSuccess: "Comment posted successfully!",
        loadingComments: false,
      });
    } catch (err) {
      updateState({
        commentError: "Failed to post comment. Please try again.",
        commentSuccess: null,
        loadingComments: false,
      });
    }
  };

  const handleUpdateComment = async (commentId, newContent) => {
    updateState({ modifyingComment: true });
    try {
      const updatedComment = await updateComment(commentId, newContent);
      updateState({
        comments: comments.map((comment) =>
          comment.id === commentId ? updatedComment : comment
        ),
        commentSuccess: "Comment updated successfully!",
        modifyingComment: false,
      });
    } catch (err) {
      updateState({
        commentError: "Failed to update comment.",
        modifyingComment: false,
      });
    }
  };

  const handleDeleteComment = async (commentId) => {
    updateState({ modifyingComment: true });
    try {
      await deleteComment(commentId);
      updateState({
        comments: comments.filter((comment) => comment.id !== commentId),
        commentSuccess: "Comment deleted successfully!",
        modifyingComment: false,
      });
    } catch (err) {
      updateState({
        commentError: "Failed to delete comment.",
        modifyingComment: false,
      });
    }
  };

  const handleLoadMoreComments = async () => {
    updateState({ loadingComments: true });
    try {
      const nextPage = page + 1;
      const data = await fetchComments(postId, nextPage);
      updateState({
        comments: [...comments, ...(data.results || [])],
        page: nextPage,
        hasMore: !!data.next,
        loadingComments: false,
      });
    } catch (err) {
      updateState({
        commentError: "Failed to load more comments.",
        loadingComments: false,
      });
    }
  };

  useEffect(() => {
    if (commentSuccess || commentError) {
      const timer = setTimeout(() => {
        updateState({ commentSuccess: null, commentError: null });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [commentSuccess, commentError]);

  const setCommentText = (text) => updateState({ commentText: text });

  return (
    <div className={`${styles.commentsCard} ${sharedStyles.commentsContainer}`}>
      <AlertMessage success={commentSuccess} error={commentError} />

      <CommentForm
        commentText={commentText}
        setCommentText={setCommentText}
        handleSubmitComment={handleSubmitComment}
        loading={loadingComments || modifyingComment}
        currentUser={currentUser}
      />

      <div>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            currentUser={currentUser}
            onUpdate={(newContent) => handleUpdateComment(comment.id, newContent)}
            onDelete={() => handleDeleteComment(comment.id)}
            isModifying={modifyingComment}
          />
        ))}
      </div>

      {hasMore && (
        <div className="text-center mt-3">
          <Button
            onClick={handleLoadMoreComments}
            disabled={loadingComments}
            className={`${sharedStyles.button} ${sharedStyles["button--orange"]}`}
          >
            {loadingComments ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="ms-2">Loading...</span>
              </>
            ) : (
              "Load More Comments"
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CommentList;
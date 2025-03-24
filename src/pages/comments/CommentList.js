import React, { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import CommentSection from "./CommentSection";
import { fetchComments, postComment } from "./CommentUtils";
import AlertMessage from "../comments/AlertMessage";

const CommentList = ({ postId, currentUser }) => {
  const [commentState, setCommentState] = useState({
    comments: [],
    commentText: "",
    commentError: null,
    commentSuccess: null,
    page: 1,
    hasMore: true,
    loadingComments: false,
  });

  const { comments, commentText, commentError, commentSuccess, page, hasMore, loadingComments } = commentState;

  useEffect(() => {
    const loadInitialComments = async () => {
      try {
        setCommentState((prev) => ({ ...prev, loadingComments: true }));
        const data = await fetchComments(postId);
        setCommentState((prev) => ({
          ...prev,
          comments: data.results || [],
          hasMore: !!data.next,
          loadingComments: false,
        }));
      } catch (err) {
        setCommentState((prev) => ({
          ...prev,
          commentError: "Failed to load comments.",
          loadingComments: false,
        }));
      }
    };
    loadInitialComments();
  }, [postId]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setCommentState((prev) => ({ ...prev, loadingComments: true }));
    try {
      const data = await postComment(postId, commentText);
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
    }
  };

  const handleLoadMoreComments = async () => {
    setCommentState((prev) => ({ ...prev, loadingComments: true }));
    try {
      const nextPage = page + 1;
      const data = await fetchComments(postId, nextPage);
      setCommentState((prev) => ({
        ...prev,
        comments: [...prev.comments, ...(data.results || [])],
        page: nextPage,
        hasMore: !!data.next,
        loadingComments: false,
      }));
    } catch (err) {
      setCommentState((prev) => ({
        ...prev,
        commentError: "Failed to load more comments.",
        loadingComments: false,
      }));
    }
  };

  useEffect(() => {
    if (commentSuccess || commentError) {
      const timer = setTimeout(() => {
        setCommentState((prev) => ({ ...prev, commentSuccess: null, commentError: null }));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [commentSuccess, commentError]);

  const setCommentText = (text) => {
    setCommentState(prev => ({ ...prev, commentText: text }));
  };

  return (
    <div className="comments-container">
      <AlertMessage success={commentSuccess} error={commentError} />

      <CommentForm 
        commentText={commentText}
        setCommentText={setCommentText}
        handleSubmitComment={handleSubmitComment}
        loadingComments={loadingComments}
        currentUser={currentUser}
      />

      <CommentSection
        comments={comments}
        loadingComments={loadingComments}
        hasMore={hasMore}
        handleLoadMoreComments={handleLoadMoreComments}
        commentError={commentError}
      />
    </div>
  );
};

export default CommentList;
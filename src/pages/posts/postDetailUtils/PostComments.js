import React, { forwardRef, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import CommentList from "../../comments/CommentList";
import styles from "../../../styles/PostDetailPage.module.css";
import sharedStyles from "../../../styles/SharedStyles.module.css";

const PostComments = forwardRef(({ postId, currentUser }, ref) => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToComments && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.state, ref]);

  return (
    <div ref={ref} id="comments" className={`${styles.commentsContainer} ${sharedStyles.commentsContainer}`}>
      <Card className={`${styles.commentsCard} ${sharedStyles.baseCard}`}>
        <Card.Body>
          <CommentList postId={postId} currentUser={currentUser} />
        </Card.Body>
      </Card>
    </div>
  );
});

export default PostComments;
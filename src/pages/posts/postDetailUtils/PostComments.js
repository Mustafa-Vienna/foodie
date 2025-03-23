import React from "react";
import { Card } from "react-bootstrap";
import CommentList from "../../comments/CommentList";
import styles from "../../../styles/PostDetailPage.module.css";

const PostComments = ({ postId, currentUser }) => {
  return (
    <Card className={`${styles.postCard} mt-4`}>
      <Card.Body>
        <CommentList postId={postId} currentUser={currentUser} />
      </Card.Body>
    </Card>
  );
};

export default PostComments;
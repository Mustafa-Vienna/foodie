import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../styles/PostCard.module.css";

const PostCard = ({ id, title, content, image, likes_count, comments_count }) => {
  return (
    <Card className={styles.postCard}>
      <Link to={`/posts/${id}`}>
        <Card.Img variant="top" src={image} alt={title} className={styles.postImage} />
      </Link>
      <Card.Body className={styles.cardBody}>
        <Card.Title className={styles.postTitle}>{title}</Card.Title>
        <Card.Text className={styles.postText}>
          {content.substring(0, 100) + (content.length > 100 ? "..." : "")}
        </Card.Text>

        {/* Like and Comment Counts */}
        <div className={styles.socialStats}>
          <div className={styles.statItem}>
            <i className="fa-solid fa-heart"></i> {likes_count}
          </div>
          <div className={styles.statItem}>
            <i className="fa-solid fa-comment"></i> {comments_count}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PostCard;
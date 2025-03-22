import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import LikeButton from "../pages/likes/LikeButton";
import styles from "../styles/PostCard.module.css";

const PostCard = ({
  id,
  title,
  content,
  image,
  likes_count,
  comments_count,
  activeWarning,
  setActiveWarning,
}) => {
  const currentUser = useCurrentUser();
  const isLoggedIn = !!currentUser;
  const [likesCount, setLikesCount] = useState(likes_count);

  const handleWarning = (type) => {
    setActiveWarning({ postId: id, type });
  };

  const introduction = content?.introduction || "";

  return (
    <Card className={styles.postCard}>
      <Link to={`/posts/${id}`}>
        <Card.Img variant="top" src={image} alt={title} className={styles.postImage} />
      </Link>
      <Card.Body className={styles.cardBody}>
        <Card.Title className={styles.postTitle}>{title}</Card.Title>
        <Card.Text className={styles.postText}>
          {introduction.substring(0, 100) + (introduction.length > 100 ? "..." : "")}
        </Card.Text>
        <div className={styles.socialStats}>
          {isLoggedIn ? (
            <div className={styles.statItem}>
              <LikeButton postId={id} likesCount={likesCount} setLikesCount={setLikesCount} />
            </div>
          ) : (
            <span onClick={() => handleWarning("like")} className={`${styles.statItem} ${styles.notLoggedIn}`}>
              <i className="fa-regular fa-heart"></i> {likesCount}
            </span>
          )}
          <span
            onClick={!isLoggedIn ? () => handleWarning("comment") : undefined}
            className={`${styles.statItem} ${!isLoggedIn ? styles.notLoggedIn : ""}`}
          >
            <i className="fa-regular fa-comment"></i> {comments_count}
          </span>
        </div>
        {!isLoggedIn && activeWarning?.postId === id && (
          <p className={styles.signupWarningText}>
            {activeWarning.type === "like" ? "Log in to like this post!" : "Log in to comment on this post!"}
          </p>
        )}
      </Card.Body>
    </Card>
  );
};

export default PostCard;
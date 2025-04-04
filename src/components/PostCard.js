import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import LikeButton from "../pages/likes/LikeButton";
import styles from "../styles/PostCard.module.css";
import sharedStyles from "../styles/SharedStyles.module.css";

const PostCard = ({
  id,
  title,
  content,
  image,
  likes_count,
  comments_count,
  activeWarning,
  setActiveWarning,
  like_id,
  onUnlike,
  inLikedPage = false,
}) => {
  const currentUser = useCurrentUser();
  const isLoggedIn = !!currentUser;
  const [likesCount, setLikesCount] = useState(likes_count);
  const navigate = useNavigate();

  const handleWarning = (type) => {
    setActiveWarning({ postId: id, type });
  };

  const handleCommentClick = () => {
    if (isLoggedIn) {
      navigate(`/posts/${id}#comments`, { state: { scrollToComments: true } });
    } else {
      handleWarning("comment");
    }
  };

  const handleUnlike = async () => {
    try {
      setLikesCount((prev) => prev - 1);
      if (onUnlike) {
        onUnlike(id);
      }
    } catch (err) {
      console.error("Failed to handle unlike:", err);
      setLikesCount((prev) => prev + 1);
    }
  };

  const introduction = content?.introduction || "";

  return (
    <Card
      className={`
        ${styles.postCard} 
        ${sharedStyles.baseCard}
      `}
    >
      <Link to={`/posts/${id}`}>
        <Card.Img variant="top" src={image} alt={title} className={styles.postImage} />
      </Link>
      <Card.Body className={sharedStyles.cardBody}>
        <Card.Title className={styles.postTitle}>{title}</Card.Title>
        <Card.Text className={styles.postText}>
          {introduction.substring(0, 100) + (introduction.length > 100 ? "..." : "")}
        </Card.Text>
        <div className={sharedStyles.socialStats}>
          {isLoggedIn ? (
            <div className={sharedStyles.statItem}>
              <span className={sharedStyles.flexCenter}>
                <LikeButton
                  postId={id}
                  likesCount={likesCount}
                  setLikesCount={setLikesCount}
                  likeId={like_id}
                  onUnlike={inLikedPage ? handleUnlike : null}
                />
                <span className={sharedStyles["text--muted"]}></span>
              </span>
            </div>
          ) : (
            <div className={sharedStyles.statItem}>
              <span
                onClick={() => handleWarning("like")}
                className={`${sharedStyles.notLoggedIn} ${sharedStyles["colorTransition"]}`}
              >
                <i className="fa-regular fa-heart"></i>{" "}
                <span className={sharedStyles["text--muted"]}>
                  {likesCount}
                </span>
              </span>
            </div>
          )}
          <div className={sharedStyles.statItem}>
            <button
              onClick={handleCommentClick}
              className={`${sharedStyles.commentLink} ${sharedStyles["colorTransition"]}`}
              style={{ background: "none", border: "none", padding: 0 }}
            >
              <i className="fa-regular fa-comment"></i>{" "}
              <span className={sharedStyles["text--muted"]}>
                {comments_count}
              </span>
            </button>
          </div>
        </div>
        {!isLoggedIn && activeWarning?.postId === id && (
          <p className={`${sharedStyles.message} ${sharedStyles["message--warning"]}`}>
            {activeWarning.type === "like" ? "Log in to like this post!" : "Log in to comment on this post!"}
          </p>
        )}
      </Card.Body>
    </Card>
  );
};

export default PostCard;
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../../contexts/CurrentUserContext";
import LikeButton from "../../likes/LikeButton";
import styles from "../../../styles/PostDetailPage.module.css";
import sharedStyles from "../../../styles/SharedStyles.module.css";

const PostMeta = ({ post, likesCount, setLikesCount, postId, commentsRef }) => {
  const currentUser = useCurrentUser();
  const isLoggedIn = !!currentUser;
  const navigate = useNavigate();

  const handleCommentClick = () => {
    if (isLoggedIn) {
      if (commentsRef?.current) { // Safe check for ref
        commentsRef.current.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate(`/posts/${postId}#comments`, { state: { scrollToComments: true } });
      }
    } else {
      handleWarning("comment");
    }
  };

  const handleWarning = (type) => {
    console.warn(`Please log in to ${type}.`);
    navigate("/signin");
  };

  return (
    <div className={styles.postMetaContainer}>
      <div className={styles.postMeta}>
        <strong>Category:</strong>{" "}
        <span className={`${styles.metaValue} ${sharedStyles["color-orange"]}`}>
          {post.category}
        </span>
      </div>

      {post.tags && post.tags.length > 0 && (
        <div className={styles.postMeta}>
          <strong>Tags:</strong>{" "}
          {post.tags.map((tag, index) => (
            <span key={tag.id}>
              {index > 0 && ", "}
              <Link
                to={`/posts/?tags=${tag.id}`}
                className={`${styles.postTag} ${sharedStyles["link--orange"]}`}
              >
                {tag.name}
              </Link>
            </span>
          ))}
        </div>
      )}
      <div className={sharedStyles.socialStats}>
        <div className={sharedStyles.statItem}>
          {currentUser ? (
            <span className={sharedStyles.flexCenter}>
              <LikeButton
                postId={postId}
                likesCount={likesCount}
                setLikesCount={setLikesCount}
                likeId={post.like_id}
              />
              <span className={sharedStyles["text--muted"]}>
                Total Likes: {likesCount}
              </span>
            </span>
          ) : (
            <Link
              to="/signin"
              className={`${sharedStyles["notLoggedIn"]} ${sharedStyles["colorTransition"]}`}
            >
              <i className="fa-regular fa-heart"></i>{" "}
              <span className={sharedStyles["text--muted"]}>
                Total Likes: {likesCount}
              </span>
            </Link>
          )}
        </div>
        <div className={sharedStyles.statItem}>
          <button
            onClick={handleCommentClick}
            className={`${sharedStyles.commentLink} ${sharedStyles["colorTransition"]}`}
            style={{ background: "none", border: "none", padding: 0 }}
          >
            <i className="fa-regular fa-comment"></i>{" "}
            <span className={sharedStyles["text--muted"]}>
              Total Comments: {post.comments_count}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostMeta;
import React from "react";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../../contexts/CurrentUserContext";
import LikeButton from "../../likes/LikeButton";
import styles from "../../../styles/PostDetailPage.module.css";
import sharedStyles from "../../../styles/SharedStyles.module.css";

const PostMeta = ({ post, likesCount, setLikesCount, postId }) => {
  const currentUser = useCurrentUser();

  return (
    <div className={styles.postMetaContainer}>
      <div className={styles.postMeta}>
        <strong>Category:</strong>{" "}
        <span className={styles.metaValue}>{post.category}</span>
      </div>

      {post.tags && post.tags.length > 0 && (
        <div className={styles.postMeta}>
          <strong>Tags:</strong>{" "}
          {post.tags.map((tag, index) => (
            <span key={tag.id}>
              {index > 0 && ", "}
              <Link to={`/posts/?tags=${tag.id}`} className={`${styles.postTag} ${sharedStyles["link--orange"]}`}>
                {tag.name}
              </Link>
            </span>
          ))}
        </div>
      )}

      <div className={sharedStyles.socialStats}>
        <div className={sharedStyles.statItem}>
          {currentUser ? (
            <LikeButton
              postId={postId}
              likesCount={likesCount}
              setLikesCount={setLikesCount}
              likeId={post.like_id}
            />
          ) : (
            <Link to="/signin" className={sharedStyles["link--blue"]}>
              <i className="fa-regular fa-heart"></i> {likesCount}
            </Link>
          )}
        </div>
        <div className={sharedStyles.statItem}>
          <Link 
            to={`/posts/${postId}#comments`} 
            className={sharedStyles.commentLink}
          >
            <i className="fa-regular fa-comment"></i> {post.comments_count}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostMeta;
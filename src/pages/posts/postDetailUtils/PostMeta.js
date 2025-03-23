import React from "react";
import { Link } from "react-router-dom";
import LikeButton from "../../likes/LikeButton";
import styles from "../../../styles/PostDetailPage.module.css";
import sharedStyles from "../../../styles/SharedStyles.module.css";

const PostMeta = ({ post, likesCount, postId }) => {
  return (
    <div className={styles.postMetaContainer}>
      <div className={styles.postMeta}>
        <strong>Category:</strong> {post.category}
      </div>

      {post.tags && post.tags.length > 0 && (
        <div className={styles.postMeta}>
          <strong>Tags:</strong>{" "}
          {post.tags.map((tag, index) => (
            <span key={tag.id}>
              {index > 0 && ", "}
              <Link to={`/posts/?tags=${tag.id}`} className={styles.postTag}>
                {tag.name}
              </Link>
            </span>
          ))}
        </div>
      )}

      <div className={sharedStyles.socialStats}>
        <div className={sharedStyles.statItem}>
          <LikeButton postId={postId} />
          <span> Likes: {likesCount}</span>
        </div>
      </div>
    </div>
  );
};

export default PostMeta;
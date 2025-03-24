import React from "react";
import { Button, Spinner } from "react-bootstrap";
import styles from "../../styles/LoadMoreButton.module.css";
import sharedStyles from "../../styles/SharedStyles.module.css";

const LoadMoreButton = ({ loading, hasMore, onLoadMore }) => {
  if (!hasMore) return null;

  return (
    <div className="text-center mt-3">
      <Button
        onClick={onLoadMore}
        disabled={loading}
        className={`${styles.loadMoreBtn} ${sharedStyles["transformTransition--fast"]} ${sharedStyles.backgroundColorTransition} ${loading ? sharedStyles.disabled : ""}`}
      >
        {loading ? <Spinner as="span" animation="border" size="sm" /> : "Load More"}
      </Button>
    </div>
  );
};

export default LoadMoreButton;
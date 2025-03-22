import React from "react";
import { Button, Spinner } from "react-bootstrap";
import styles from "../../styles/LoadMoreButton.module.css";

const LoadMoreButton = ({ loading, hasMore, onLoadMore }) => {
  if (!hasMore) return null;

  return (
    <div className="text-center mt-3">
      <Button
        variant="outline-primary"
        onClick={onLoadMore}
        disabled={loading}
        className={styles.loadMoreBtn}
      >
        {loading ? <Spinner as="span" animation="border" size="sm" /> : "Load More"}
      </Button>
    </div>
  );
};

export default LoadMoreButton;
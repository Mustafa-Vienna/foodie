import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";
import styles from "../../styles/Comment.module.css";
import sharedStyles from "../../styles/SharedStyles.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const Comment = ({ comment, onUpdate, onDelete, isModifying }) => {
  const { author, content, created_at, profile_image, profile_id } = comment;
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const currentUserProfile = useCurrentUser();
  const isAuthor = currentUserProfile?.username === author;

  const handleUpdate = async () => {
    try {
      await onUpdate(editedContent);
      setShowEditModal(false);
    } catch (err) {
      console.error("Failed to update comment:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await onDelete();
      setShowDeleteModal(false);
    } catch (err) {
      console.error("Failed to delete comment:", err);
    }
  };

  // Reusable modal renderer
  const renderModal = (show, onHide, title, body, footer) => (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>{footer}</Modal.Footer>
    </Modal>
  );

  const editModalBody = (
    <Form.Group>
      <Form.Control
        as="textarea"
        rows={3}
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
        disabled={isModifying}
        className={sharedStyles.formInput}
      />
    </Form.Group>
  );

  const editModalFooter = (
    <>
      <Button
        variant="secondary"
        onClick={() => setShowEditModal(false)}
        disabled={isModifying}
        className={sharedStyles["button--gray"]}
      >
        Cancel
      </Button>
      <Button
        variant="primary"
        onClick={handleUpdate}
        disabled={isModifying}
        className={sharedStyles["button--orange"]}
      >
        {isModifying ? "Saving..." : "Save Changes"}
      </Button>
    </>
  );

  const deleteModalBody = (
    <p className={sharedStyles["text--muted"]}>
      Are you sure you want to delete this comment?
    </p>
  );

  const deleteModalFooter = (
    <>
      <Button
        variant="secondary"
        onClick={() => setShowDeleteModal(false)}
        disabled={isModifying}
        className={sharedStyles["button--gray"]}
      >
        Cancel
      </Button>
      <Button
        variant="danger"
        onClick={handleDelete}
        disabled={isModifying}
        className={sharedStyles["button--red"]}
      >
        {isModifying ? "Deleting..." : "Delete"}
      </Button>
    </>
  );

  return (
    <div
      className={`${styles.commentContainer} ${sharedStyles.commentsContainer} ${sharedStyles.backgroundTransition}`}
    >
      <div className={`${styles.commentHeader} ${sharedStyles.flexSpaceBetween}`}>
        <Link
          to={`/profiles/${profile_id}`}
          className={`${styles.commentAuthor} ${sharedStyles.flexCenter}`}
        >
          {profile_image && (
            <img
              src={profile_image}
              alt={author}
              className={`${styles.authorImage} ${sharedStyles.circle}`}
            />
          )}
          <span>{author}</span>
        </Link>
        <div className="d-flex align-items-center">
          <span className={styles.commentDate}>{created_at}</span>
          {isAuthor && (
            <div className="ms-3">
              <Button
                variant="link"
                size="sm"
                onClick={() => setShowEditModal(true)}
                disabled={isModifying}
                className={sharedStyles["text--muted"]}
              >
                Edit
              </Button>
              <Button
                variant="link"
                size="sm"
                onClick={() => setShowDeleteModal(true)}
                disabled={isModifying}
                className={sharedStyles["message--warning"]}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className={styles.commentContent}>{content}</div>

      {renderModal(
        showEditModal,
        () => setShowEditModal(false),
        "Edit Comment",
        editModalBody,
        editModalFooter
      )}

      {renderModal(
        showDeleteModal,
        () => setShowDeleteModal(false),
        "Delete Comment",
        deleteModalBody,
        deleteModalFooter
      )}
    </div>
  );
};

export default Comment;
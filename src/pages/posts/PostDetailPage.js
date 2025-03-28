// PostDetailPage.js
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Container, Card, Spinner, Alert, Row, Col, Button, Modal } from "react-bootstrap";
import styles from "../../styles/PostDetailPage.module.css";
import sharedStyles from "../../styles/SharedStyles.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { fetchPost } from "../posts/postDetailUtils/PostUtils"; 
import { fetchTags } from "../../utils/FetchTags";
import { handleChange, handleTagChange, handleChangeImage } from "../../utils/FormStateHelper";
import { handleUpdate, handleDelete } from "../../utils/FormHelper";
import { FormLayout } from "../../utils/FormLayout";
import PostContent from "../posts/postDetailUtils/PostContent";
import PostMeta from "../posts/postDetailUtils/PostMeta";
import PostComments from "../posts/postDetailUtils/PostComments";

const PostDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [likesCount, setLikesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editedPost, setEditedPost] = useState({
    title: "",
    content: { introduction: "", ingredients: [""], steps: [""], conclusion: "" },
    category: "",
    tags: [],
    image_filter: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [availableTags, setAvailableTags] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [newStep, setNewStep] = useState("");
  const [isModifying, setIsModifying] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const currentUser = useCurrentUser();
  const commentsRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const loadPostAndTags = async () => {
      try {
        const data = await fetchPost(id);
        if (isMounted) {
          setPost(data);
          setLikesCount(data.likes_count || 0);
          const content = typeof data.content === "string" ? JSON.parse(data.content) : data.content;
          setEditedPost({
            title: data.title,
            content: {
              introduction: content?.introduction || "",
              ingredients: content?.ingredients || [""],
              steps: content?.steps || [""],
              conclusion: content?.conclusion || "",
            },
            category: data.category || "",
            tags: data.tags?.map((tag) => tag.id.toString()) || [],
            image_filter: data.image_filter || "",
            image: data.image || null,
          });
          setImagePreview(data.image);
          await fetchTags(setAvailableTags);
        }
      } catch (err) {
        setError("Post not found or an error occurred.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadPostAndTags();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const renderModal = (show, onHide, title, body, footer) => (
    <Modal 
      show={show} 
      onHide={onHide}
      dialogClassName={styles.customModal}
      centered
      scrollable
      size="xl"
    >
      <Modal.Header closeButton className="sticky-top bg-white">
        <Modal.Title className="h4">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        <div className="container-fluid">
          {body}
        </div>
      </Modal.Body>
      <Modal.Footer className="sticky-bottom bg-white">
        {footer}
      </Modal.Footer>
    </Modal>
  );

  const editModalBody = (
    <div className="edit-form-container">
      <div className="mb-4">
        <h5 className="mb-3">Basic Information</h5>
        <FormLayout
          postData={editedPost}
          setPostData={setEditedPost}
          newIngredient={newIngredient}
          setNewIngredient={setNewIngredient}
          newStep={newStep}
          setNewStep={setNewStep}
          imagePreview={imagePreview}
          availableTags={availableTags}
          handleChange={handleChange}
          handleChangeImage={handleChangeImage}
          handleTagChange={handleTagChange}
          handleAddItem={require("../../utils/FormHelper").handleAddItem}
          handleRemoveItem={require("../../utils/FormHelper").handleRemoveItem}
          setErrors={setValidationErrors}
          setImagePreview={setImagePreview}
          validationErrors={validationErrors}
        />
      </div>
    </div>
  );

  const editModalFooter = (
    <div className="w-100 d-flex justify-content-between">
      <Button
        variant="outline-secondary"
        onClick={() => setShowEditModal(false)}
        disabled={isModifying}
        className={`${sharedStyles["button--gray"]} px-4`}
      >
        Cancel
      </Button>
      <Button
        variant="primary"
        onClick={() => handleUpdate(id, editedPost, setPost, setShowEditModal, setValidationErrors, setError, setIsModifying)}
        disabled={isModifying}
        className={`${sharedStyles["button--orange"]} px-4`}
      >
        {isModifying ? (
          <>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            <span className="ms-2">Saving...</span>
          </>
        ) : (
          "Save Changes"
        )}
      </Button>
    </div>
  );

  const deleteModalBody = (
    <p className={sharedStyles["text--muted"]}>
      Are you sure you want to delete this post? This action cannot be undone.
    </p>
  );

  const deleteModalFooter = (
    <>
      <Button
        variant="outline-secondary"
        onClick={() => setShowDeleteModal(false)}
        disabled={isModifying}
        className={`${sharedStyles["button--gray"]} px-3`}
      >
        Cancel
      </Button>
      <Button
        variant="danger"
        onClick={() => handleDelete(id, navigate, setError, setIsModifying)}
        disabled={isModifying}
        className={`${sharedStyles["button--red"]} px-3`}
      >
        {isModifying ? (
          <>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            <span className="ms-2">Deleting...</span>
          </>
        ) : (
          "Delete"
        )}
      </Button>
    </>
  );

  if (loading)
    return (
      <Container className="text-center my-4">
        <Spinner animation="border" /> Loading post details...
      </Container>
    );

  if (error)
    return (
      <Container className="text-center">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );

  if (!post)
    return <Container className="text-center">Post not found.</Container>;

  const hasStructuredContent = post.content && typeof post.content === "object";
  const isAuthor = currentUser?.username === post.author;

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <Card className={`${styles.postCard} ${sharedStyles.baseCard}`}>
          <Card.Img
            variant="top"
            src={post.image}
            alt={post.title}
            className={styles.postImage}
          />
          <Card.Body className={styles.cardBody}>
            <div className={sharedStyles.flexSpaceBetween}>
              <Card.Title className={styles.postTitle}>{post.title}</Card.Title>
              {isAuthor && (
                <div>
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => setShowEditModal(true)}
                    disabled={isModifying}
                    className={sharedStyles["text--muted"]}
                  >
                    <i className="fas fa-edit me-1"></i> Edit
                  </Button>
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => setShowDeleteModal(true)}
                    disabled={isModifying}
                    className={sharedStyles["message--warning"]}
                  >
                    <i className="fas fa-trash-alt me-1"></i> Delete
                  </Button>
                </div>
              )}
            </div>
            <Card.Subtitle className={styles.postSubtitle}>
              {post.profile_id ? (
                <>By <Link to={`/profiles/${post.profile_id}`} className={styles.authorLink}>{post.author}</Link></>
              ) : (
                <>By {post.author}</>
              )}
            </Card.Subtitle>

            {hasStructuredContent ? (
              <PostContent content={post.content} />
            ) : (
              <Card.Text className={styles.postContent}>{post.content}</Card.Text>
            )}
            <PostMeta
              post={post}
              likesCount={likesCount}
              setLikesCount={setLikesCount}
              postId={id}
            />
          </Card.Body>
        </Card>

        <PostComments ref={commentsRef} postId={id} currentUser={currentUser} />
      </Col>

      {renderModal(
        showEditModal,
        () => setShowEditModal(false),
        "Edit Post",
        editModalBody,
        editModalFooter
      )}
      {renderModal(
        showDeleteModal,
        () => setShowDeleteModal(false),
        "Delete Post",
        deleteModalBody,
        deleteModalFooter
      )}
    </Row>
  );
};

export default PostDetailPage;
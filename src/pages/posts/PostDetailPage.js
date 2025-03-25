import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import PostSidebar from "../posts/postDetailUtils/PostSidebar";
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
            image: null,
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
    <Modal show={show} onHide={onHide} size="lg" dialogClassName={styles.wideModal}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>{footer}</Modal.Footer>
    </Modal>
  );

  const editModalBody = (
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
      validationErrors={validationErrors} // Add this to pass validationErrors
    />
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
        onClick={() => handleUpdate(id, editedPost, setPost, setShowEditModal, setValidationErrors, setError, setIsModifying)}
        disabled={isModifying}
        className={sharedStyles["button--orange"]}
      >
        {isModifying ? "Saving..." : "Save Changes"}
      </Button>
    </>
  );

  const deleteModalBody = (
    <p className={sharedStyles["text--muted"]}>
      Are you sure you want to delete this post? This action cannot be undone.
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
        onClick={() => handleDelete(id, navigate, setError, setIsModifying)}
        disabled={isModifying}
        className={sharedStyles["button--red"]}
      >
        {isModifying ? "Deleting..." : "Delete"}
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
            <Card.Subtitle className={styles.postSubtitle}>
              By {post.author}
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

      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PostSidebar />
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
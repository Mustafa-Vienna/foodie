import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefault";
import { Container, Card, Spinner, Alert, Row, Col } from "react-bootstrap";
import styles from "../../styles/PostDetailPage.module.css";
import sharedStyles from "../../styles/SharedStyles.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import PostContent from "./postDetailUtils/PostContent";
import PostMeta from "./postDetailUtils/PostMeta";
import PostSidebar from "./postDetailUtils/PostSidebar";
import PostComments from "./postDetailUtils/PostComments";

const PostDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [likesCount, setLikesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentUser = useCurrentUser();
  const commentsRef = useRef();

  useEffect(() => {
    let isMounted = true;

    const fetchPost = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/${id}/`);
        if (isMounted) {
          setPost(data);
          setLikesCount(data.likes_count || 0);
        }
      } catch (err) {
        setError("Post not found or an error occurred.");
        console.error("Error fetching post:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPost();

    return () => {
      isMounted = false;
    };
  }, [id]);

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

  const hasStructuredContent = post.content && typeof post.content === 'object';

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
            <Card.Title className={styles.postTitle}>{post.title}</Card.Title>
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
    </Row>
  );
};

export default PostDetailPage;